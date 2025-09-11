import type { Metadata, Viewport } from 'next'
import { Anton, Lato } from 'next/font/google'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-anton'
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Joyous Chess Academy - Building Brilliant Minds Through Joyful Chess',
  description: 'A new kind of chess academy — live online classes, exciting tournaments, and joyful progress for every child.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${lato.variable} font-lato`}>
        {children}
        
        {/* Load Netlify Identity widget for invite token handling */}
        <script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        />
        
        {/* Initialize Netlify Identity for invite token handling */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Check for invite token immediately on page load
              let hasInviteToken = false;
              const currentHash = window.location.hash;
              
              if (currentHash && currentHash.includes('invite_token=')) {
                hasInviteToken = true;
                console.log('Invite token detected in URL:', currentHash);
              }
              
              // Function to handle Identity initialization
              function initializeNetlifyIdentity() {
                if (window.netlifyIdentity) {
                  console.log('Netlify Identity widget loaded');
                  
                  // Force signup modal if we detected an invite token
                  if (hasInviteToken) {
                    console.log('Opening signup modal for invite token...');
                    setTimeout(() => {
                      window.netlifyIdentity.open('signup');
                    }, 100);
                  }
                  
                  // Set up event listeners
                  window.netlifyIdentity.on("init", user => {
                    console.log('Identity initialized, current user:', user ? user.email : 'none');
                    
                    // Also check for invite token here as backup
                    if (!user && hasInviteToken) {
                      console.log('No user found, opening signup for invite token');
                      window.netlifyIdentity.open('signup');
                    }
                  });
                  
                  window.netlifyIdentity.on("login", user => {
                    console.log('User logged in:', user.email);
                    if (!window.location.pathname.includes('/admin')) {
                      console.log('Redirecting to admin panel...');
                      window.location.href = '/admin';
                    }
                  });
                  
                  window.netlifyIdentity.on("signup", user => {
                    console.log('User signed up:', user.email);
                    console.log('Redirecting to admin panel after signup...');
                    window.location.href = '/admin';
                  });
                  
                  window.netlifyIdentity.on("close", () => {
                    console.log('Identity modal closed');
                  });
                  
                  window.netlifyIdentity.on("error", error => {
                    console.error('Identity error:', error);
                  });
                  
                  // Initialize the widget
                  window.netlifyIdentity.init();
                  
                } else {
                  console.log('Netlify Identity not loaded yet, retrying...');
                  setTimeout(initializeNetlifyIdentity, 500);
                }
              }
              
              // Start initialization immediately
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeNetlifyIdentity);
              } else {
                initializeNetlifyIdentity();
              }
              
              // Additional check after a delay to ensure signup opens
              if (hasInviteToken) {
                setTimeout(() => {
                  if (window.netlifyIdentity && !window.netlifyIdentity.currentUser()) {
                    console.log('Backup: Opening signup modal after delay');
                    window.netlifyIdentity.open('signup');
                  }
                }, 2000);
              }
            `,
          }}
        />
      </body>
    </html>
  )
} 