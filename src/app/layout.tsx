import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../app/globals.css'
import Providers from "../components/layout/Providers"

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AI Landing Page | Smart Prosthetics Powered by AI',
  description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
  openGraph: {
    title: 'AI Landing Page | Smart Prosthetics Powered by AI',
    description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
    url: siteUrl,
    siteName: 'AI Landing Page',
    type: 'website',
    images: [{ url: '/images/athlete_prosthetic_1780052307449.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Landing Page | Smart Prosthetics Powered by AI',
    description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
    images: ['/images/athlete_prosthetic_1780052307449.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
