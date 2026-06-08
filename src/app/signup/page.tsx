import AuthLeftComponent from '@/widgets/auth/AuthLeftComponent'
import SignupRightComponent from '@/widgets/signup/SignupRightComponent'

export default function SignUpPage() {
  return (
    <main className="w-full h-screen flex">
      <AuthLeftComponent showStats={false} />
      <SignupRightComponent />
    </main>
  )
}
