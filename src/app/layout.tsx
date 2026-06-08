import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/shared/providers/QueryProvider'

export const metadata: Metadata = {
  title: {
    default: 'Moa Ticket',
    template: '%s | Moa Ticket',
  },
  description: 'Moa Ticket - Your ticketing platform',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
