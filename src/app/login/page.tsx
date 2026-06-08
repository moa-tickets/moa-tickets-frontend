import AuthLeftComponent from '@/widgets/auth/AuthLeftComponent'
import LoginRightComponent from '@/widgets/login/LoginRightComponent'

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex">
      <AuthLeftComponent showStats={true} />
      <LoginRightComponent />
    </main>
  )
}
