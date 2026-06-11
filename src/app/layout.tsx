import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MOA 티켓',
    template: '%s | MOA 티켓',
  },
  description: 'MOA 티켓 - 공연, 스포츠, 전시 티켓 예매 플랫폼',
  keywords: ['티켓', '예매', '공연', '스포츠', '전시'],
  authors: [{ name: 'MOA Team' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'MOA 티켓',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
