import type { Metadata } from 'next'
import { Tenor_Sans, Karla } from 'next/font/google'
import './globals.css'

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-tenor-sans'
})

const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-karla'
})

export const metadata: Metadata = {
  title: 'Joyous Chess Academy - Building Brilliant Minds Through Joyful Chess',
  description: 'A new kind of chess academy — live online classes, exciting tournaments, and joyful progress for every child.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${tenorSans.variable} ${karla.variable} font-tenor-sans`}>
        {children}
      </body>
    </html>
  )
} 