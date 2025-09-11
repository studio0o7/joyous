export default function AdminPage() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Redirect to CMS admin interface
            window.location.replace('/admin/index.html');
          `,
        }}
      />
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#1E3A8A', marginBottom: '20px' }}>Tournament Admin Panel</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Redirecting you to the content management system...
        </p>
        <p>
          <a 
            href="/admin/index.html" 
            style={{ 
              color: '#F43F5E', 
              textDecoration: 'none', 
              padding: '10px 20px', 
              border: '2px solid #F43F5E', 
              borderRadius: '5px',
              display: 'inline-block',
              marginTop: '10px'
            }}
          >
            Access Admin Panel
          </a>
        </p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '30px' }}>
          You&apos;ll need to sign in with GitHub to manage tournament content.
        </p>
      </div>
    </div>
  )
} 