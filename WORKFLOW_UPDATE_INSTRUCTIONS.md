# Update GitHub Workflow Manually

Your GitHub token doesn't have "workflow" scope, so you need to update the workflow file directly on GitHub.

## Go Update This File on GitHub:

**File**: `.github/workflows/main.yml`

**Link**: https://github.com/studio0o7/joyous/edit/main/.github/workflows/main.yml

## Find This Section (Around Line 66-77):

```yaml
                if [ "$http_code" -eq 200 ]; then
                  echo "✅ Successfully created resources for $slug"
                  echo "$body"
                else
                  echo "❌ Failed to create resources for $slug (HTTP $http_code)"
                  echo "$body"
                fi
              else
                echo "⏭️  Skipping $slug (status: $status, has_sheet: $has_sheet)"
              fi
            fi
          done
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Replace It With This:

```yaml
                if [ "$http_code" -eq 200 ]; then
                  echo "✅ Successfully created resources for $slug"
                  echo "$body"
                  
                  # Parse JSON response to get IDs
                  sheetId=$(echo "$body" | jq -r '.data.sheetId')
                  sheetUrl=$(echo "$body" | jq -r '.data.sheetUrl')
                  folderId=$(echo "$body" | jq -r '.data.folderId')
                  folderUrl=$(echo "$body" | jq -r '.data.folderUrl')
                  
                  echo "Sheet ID: $sheetId"
                  echo "Sheet URL: $sheetUrl"
                  echo "Folder ID: $folderId"
                  echo "Folder URL: $folderUrl"
                  
                  # Update tournament file with IDs
                  awk -v sid="$sheetId" -v surl="$sheetUrl" -v fid="$folderId" -v furl="$folderUrl" '
                  /^---$/ {
                    if (count == 1) {
                      print "googleSheetId: \"" sid "\""
                      print "googleSheetUrl: \"" surl "\""
                      print "documentsFolderId: \"" fid "\""
                      print "documentsFolderUrl: \"" furl "\""
                    }
                    count++
                  }
                  { print }
                  ' "$file" > "${file}.tmp"
                  
                  mv "${file}.tmp" "$file"
                  
                  CHANGES_MADE=true
                  echo "✅ Updated $file with Google resource IDs"
                else
                  echo "❌ Failed to create resources for $slug (HTTP $http_code)"
                  echo "$body"
                fi
              else
                echo "⏭️  Skipping $slug (status: $status, has_sheet: $has_sheet)"
              fi
            fi
          done
          
          echo "changes_made=$CHANGES_MADE" >> $GITHUB_OUTPUT
        id: process
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Commit and push changes
        if: steps.process.outputs.changes_made == 'true'
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add content/tournaments/*.md
          git commit -m "chore: Add Google resource IDs to tournaments [skip ci]"
          git push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## What This Does:

- Parses the API response to get Sheet ID, Sheet URL, Folder ID, Folder URL
- Updates the tournament markdown file with these IDs
- Commits back to GitHub automatically
- CMS will show the IDs automatically

## After Updating:

Test it by creating a new tournament in the CMS!

The workflow will:
1. Create Google Sheet + Drive folder
2. Get the IDs back
3. Update the tournament file
4. Commit to GitHub
5. CMS shows the links

**100% automated!**

