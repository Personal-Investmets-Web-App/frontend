import { CashCatLogo } from "@/core/app/components/icons/cashcat-logo";
import { ModeToggle } from "@/core/app/components/theme-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth Layout",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex items-center h-screen w-screen">
      <div className="hidden xl:block md:w-1/3 bg-primary h-full">
        <div className="flex items-center justify-center h-full">
          <div className="w-1/2 text-background">
            <CashCatLogo />
            <h1 className="text-4xl font-bold mt-4 text-center">Welcome to CashCat</h1>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-2/3 h-full flex flex-col items-center justify-between">
        <div className="w-full flex justify-end items-center p-4">
          <ModeToggle />
        </div>
        <div className="w-full flex justify-center items-center">
          {children}
        </div>
        <div className="w-full p-4">
          <p className="text-sm text-muted-foreground">
            &copy;
          </p>
        </div>
      </div>
    </main>
  )
}