import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/shared/ui/main/Header'), {
  ssr: true,
  loading: () => <div className="h-[72px]" />, // placeholder
})

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
