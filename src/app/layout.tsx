import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../app/globals.css'
import Providers from '../components/Providers'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import CommandMenu from '../components/CommandMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Landing Page | Smart Prosthetics Powered by AI',
  description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
  openGraph: {
    title: 'AI Landing Page | Smart Prosthetics Powered by AI',
    description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Landing Page | Smart Prosthetics Powered by AI',
    description: 'Advanced AI-powered prosthetics engineered for comfort, movement, and confidence.',
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
          <ScrollProgress />
          <CommandMenu />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
