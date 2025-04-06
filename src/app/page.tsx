import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen">
      <div className="flex justify-end w-full p-4">
        <ModeToggle />
      </div>
      <div className="flex items-start justify-center mx-auto gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Neobrutalist <span className="font-extrabold text-primary">Design</span> System</h1>
          <p className="text-lg">
            A bold, raw, and <span className="font-extrabold text-primary">memorable</span> neobrutalist design system
          </p>
          
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
