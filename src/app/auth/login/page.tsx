import dynamic from 'next/dynamic'
import AuthLeftComponent from '@/widgets/auth/AuthLeftComponent'

const LoginRightComponent = dynamic(() => import('@/widgets/login/LoginRightComponent'), {
  ssr: true,
})

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex">
      <AuthLeftComponent showStats={true} />
      <LoginRightComponent />
    </main>
  )
}
