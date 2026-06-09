import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { baseUrl } from './sitemap'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Manansh Shukla',
    template: '%s | Manansh Shukla',
  },
  description: "I'm interested in what it feels like to be alive.",
  openGraph: {
    title: 'Manansh Shukla',
    description: "I'm interested in what it feels like to be alive.",
    url: baseUrl,
    siteName: 'Manansh Shukla',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="aurora" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="site-container flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <div className="breath-divider" aria-hidden="true">
            <span className="breath-dot" />
          </div>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
