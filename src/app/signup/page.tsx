import SignupLeftComponent from '@/widgets/signup/SignupLeftComponent'
import SignupRightComponent from '@/widgets/signup/SignupRightComponent'

export default function SignUpPage() {
  return (
    <main className="w-full h-screen flex">
      <SignupLeftComponent />
      <SignupRightComponent />
    </main>
  )
}
