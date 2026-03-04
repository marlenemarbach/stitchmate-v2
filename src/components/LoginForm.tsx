"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@/components/ui/Link";
import { signIn, signInAsGuest } from "../actions/auth";
import { ActionResponse } from "../actions/types";
import { Logo } from "./svg/Logo";
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
  const [state, formAction, signInPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const result = await signIn(formData);
      if (result.success) {
        router.push("/projects");
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
  }, initialState);

  const [guestError, setGuestError] = useState("");
  const [guestLoginPending, startTransition] = useTransition();

  function handleSignInAsGuest() {
    startTransition(async () => {
      try {
        const result = await signInAsGuest();
        if (result.success) {
          router.push("/projects");
        } else {
          setGuestError(result.message);
        }
      } catch (err) {
        console.error(err);
        setGuestError("An error occured creating a guest account.");
      }
    });
  }

  const pending = guestLoginPending || signInPending;

  return (
    <motion.div
      className="mb-6 flex w-[calc(100vw_-_2rem)] flex-1 flex-col items-center justify-center gap-6 self-center sm:w-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Logo />
      <h1 className="mb-4 text-center text-xl font-medium">
        Log in to Stitchmate
      </h1>

      <form className="grid w-full gap-6" action={formAction}>
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
          variant="accent"
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
      <p
        className="grid text-center text-muted-foreground data-[state=disabled]:pointer-events-none"
        data-state={pending ? "disabled" : "enabled"}
      >
        <span>No account?</span>
        <span>
          <Link href="/signup">Sign up</Link> or{" "}
          <button
            className="cursor-default rounded text-neutral-600 focus-visible:text-foreground focus-visible:outline-none dark:text-neutral-300 hover:dark:text-foreground"
            onClick={handleSignInAsGuest}
          >
            continue as guest
          </button>
        </span>
      </p>
      {guestError && (
        <FormError className="text-center text-sm text-destructive">
          {guestError}
        </FormError>
      )}
      {pending && <Loader className="animate-spin text-muted-foreground" />}
    </motion.div>
  );
}
