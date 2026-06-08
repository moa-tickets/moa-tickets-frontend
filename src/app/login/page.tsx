import LoginLeftComponent from '@/widgets/login/LoginLeftComponent'
import LoginRightComponent from '@/widgets/login/LoginRightComponent'

export default function LoginPage() {
  return (
    <main className="w-full h-screen flex">
      <LoginLeftComponent />
      <LoginRightComponent />
    </main>
  )
}
