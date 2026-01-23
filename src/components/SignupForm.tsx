"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signUp } from "../actions/auth";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function SignupForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        const result = await signUp(formData);
        if (result.success) {
          console.log("Account created successfully");
          router.push("/");
        }
        return result;
      } catch (error) {
        console.error("Sign up error:", error);
        return {
          success: false,
          message: "An error occurred while signing up",
          error: "Failed to sign up",
        };
      }
    },
    initialState,
  );
  return (
    <motion.div
      className="mb-6 flex w-[calc(100vw_-_2rem)] flex-1 flex-col items-center justify-center gap-6 self-center sm:w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="mb-4 text-center text-xl font-medium tracking-wide">
        Create Account
      </h2>

      <form className="grid w-full gap-4" action={formAction}>
        <FormField>
          <label htmlFor="email">Enter your email</label>
          <Input
            className="h-12"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@email.com"
            disabled={pending}
            aria-describedby="email-error"
            required
          />
          <FormError id="email-error">{state?.errors?.email}</FormError>
        </FormField>
        <FormField>
          <label htmlFor="password">Set a password</label>
          <Input
            className="h-12"
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            placeholder="********"
            minLength={12}
            aria-describedby="password-error"
            required
          />
          <FormError id="password-error">{state?.errors?.password}</FormError>
        </FormField>
        <Button type="submit" size="large" className="mt-3w-full">
          Create Account
        </Button>
        {state?.error && (
          <FormError className="text-center text-destructive">
            {state.message}
          </FormError>
        )}
      </form>
      <div className="flex items-center justify-center gap-2 text-foreground/90">
        Have an account?
        <Link
          href="/login"
          className="cursor-default text-pink-300/80 outline-none hover:text-pink-300 focus-visible:text-pink-300"
        >
          Login Here
        </Link>
      </div>
    </motion.div>
  );
}
