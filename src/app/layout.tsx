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
              // Wait for Netlify Identity to load
              function initializeNetlifyIdentity() {
                if (window.netlifyIdentity) {
                  console.log('Netlify Identity loaded');
                  
                  window.netlifyIdentity.on("init", user => {
                    console.log('Identity initialized, user:', user ? user.email : 'none');
                    
                    // Handle invite tokens in URL
                    const hash = window.location.hash;
                    if (hash && hash.includes('invite_token=')) {
                      const params = new URLSearchParams(hash.substr(1));
                      const inviteToken = params.get('invite_token');
                      
                      if (inviteToken && !user) {
                        console.log('Invite token found:', inviteToken, 'showing signup modal');
                        window.netlifyIdentity.open('signup');
                      }
                    }
                  });
                  
                  // Auto-redirect to admin after signup/login
                  window.netlifyIdentity.on("login", user => {
                    console.log('User logged in:', user.email);
                    // Only redirect if we're not already on admin page
                    if (!window.location.pathname.includes('/admin')) {
                      console.log('Redirecting to admin...');
                      window.location.href = '/admin';
                    }
                  });
                  
                  window.netlifyIdentity.on("signup", user => {
                    console.log('User signed up:', user.email);
                    // Redirect to admin after signup
                    console.log('Redirecting to admin after signup...');
                    window.location.href = '/admin';
                  });
                  
                  // Initialize the widget
                  window.netlifyIdentity.init();
                } else {
                  // Retry if Identity widget hasn't loaded yet
                  setTimeout(initializeNetlifyIdentity, 500);
                }
              }
              
              // Start initialization when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeNetlifyIdentity);
              } else {
                initializeNetlifyIdentity();
              }
            `,
          }}
        />
      </body>
    </html>
  )
} 