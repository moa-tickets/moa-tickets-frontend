import dynamic from 'next/dynamic'
import AuthLeftComponent from '@/widgets/auth/AuthLeftComponent'

const SignupRightComponent = dynamic(() => import('@/widgets/signup/SignupRightComponent'), {
  ssr: true,
})

export default function SignUpPage() {
  return (
    <main className="w-full h-screen flex">
      <AuthLeftComponent showStats={true} />
      <SignupRightComponent />
    </main>
  )
}
