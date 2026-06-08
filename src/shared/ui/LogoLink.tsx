import Link from 'next/link'
import Logo from './Logo'

interface LogoLinkProps {
  showText?: boolean
  logoSize?: number
  textClassName?: string
  containerClassName?: string
}

export default function LogoLink({
  showText = true,
  logoSize = 30,
  textClassName = 'text-[#fff] font-[800] text-[24px]',
  containerClassName = 'flex items-center gap-[16px]',
}: LogoLinkProps) {
  return (
    <Link href="/" className={containerClassName}>
      <Logo size={logoSize} />
      {showText && (
        <span className={textClassName} style={{ letterSpacing: '-1px', paddingBottom: '2px' }}>
          MOA TICKETS
        </span>
      )}
    </Link>
  )
}
