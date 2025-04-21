import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/core/app/components/providers/theme-provider"
import { TanstackProvider } from "@/core/app/components/providers/tanstack-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neobrutalist Design System",
  description: "A bold, raw, and memorable neobrutalist design system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
