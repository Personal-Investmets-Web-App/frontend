"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold">Access your account</h2>
        <span className="text-sm flex items-center gap-1 mt-8">
          Don&apos;t have an account? 
          <Link href="/register" className="text-sm text-muted-foreground hover:underline transition-all duration-300 hover:text-primary">Sign up</Link>
        </span>
        <div className="space-y-3 min-w-[300px] md:min-w-[400px] mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email" type="email"  {...field}
                    startIcon={MailIcon}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your email address.
                </FormDescription> */}
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} {...field}
                    startIcon={KeyIcon}
                    endIcon={showPassword ? EyeIcon : EyeOffIcon}
                    onClickEndButton={() => setShowPassword(!showPassword)}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your password.
                </FormDescription> */}
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link href="/reset-password" className="font-bold text-sm text-muted-foreground hover:underline transition-all duration-300 hover:text-primary">Forgot your password?</Link>
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
        <FormMessage />
      </form>
    </Form>
  )
}
