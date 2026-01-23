"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { signIn } from "../actions/auth";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export function LoginForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<ActionResponse, FormData>(
    async (prev: ActionResponse, formData: FormData) => {
      try {
        const result = await signIn(formData);
        if (result.success) {
          console.log("Signed in successfully");
          router.push("/");
        }
        return result;
      } catch (error) {
        console.error("Sign in error", error);
        return {
          success: false,
          message: "An error occured while signin in",
          error: "Failed to sign in",
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
      <h1 className="mb-4 text-center text-xl font-medium tracking-wide">
        Log in to Stitchmate
      </h1>

      <form className="grid w-full gap-4" action={formAction}>
        <FormField>
          <label htmlFor="email">Email</label>
          <Input
            className="h-12"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@email.com"
            aria-describedby="email-error"
            required
            disabled={pending}
          />
          <FormError id="email-error">{state?.errors?.email}</FormError>
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
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
            disabled={pending}
          />
          <FormError id="password-error">{state?.errors?.password}</FormError>
        </FormField>
        <Button
          className="mt-3 h-11 w-full"
          size="large"
          disabled={pending}
          type="submit"
        >
          Login
        </Button>
        {state?.error && (
          <FormError className="text-center text-sm text-destructive">
            {state.message}
          </FormError>
        )}
      </form>
      <p className="grid text-center leading-8 text-muted-foreground">
        <span>No account?</span>
        <span>
          <Link
            className="cursor-default rounded text-pink-300/80 hover:text-pink-300 focus-visible:text-pink-300 focus-visible:outline-none"
            href="/signup"
          >
            Sign up{" "}
          </Link>
          or{" "}
          <Link
            className="focus-visible:text-pink-30 cursor-default rounded text-pink-300/80 hover:text-pink-300 focus-visible:text-pink-300 focus-visible:outline-none"
            href="/signup"
          >
            explore as a guest
          </Link>{" "}
        </span>
      </p>
    </motion.div>
  );
}
