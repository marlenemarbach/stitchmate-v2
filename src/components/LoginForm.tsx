"use client";

import { startTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Link } from "@/components/ui/Link";
import { signIn, signInAsGuest } from "../actions/auth";
import { ActionResponse } from "../actions/types";
import { Logo } from "./svg/Logo";
import { Button } from "./ui/Button";
import { FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";
import { Spinner } from "./ui/Spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

type UserActionPayload = {
  type: "USER";
  formData: FormData;
};

type GuestActionPayload = {
  type: "GUEST";
};

type ActionPayload = GuestActionPayload | UserActionPayload;

export function LoginForm() {
  const router = useRouter();

  const [state, dispatchAction, pending] = useActionState(
    async (_: ActionResponse, payload: ActionPayload) => {
      switch (payload.type) {
        case "USER": {
          try {
            const result = await signIn(payload.formData);
            if (result.success) router.push("/projects");
            return result;
          } catch (e) {
            console.error("Sign in error:", e);
            return {
              success: false,
              message: "An error occured while signin in",
              error: "Failed to sign in",
            };
          }
        }
        case "GUEST": {
          try {
            const result = await signInAsGuest();
            if (result.success) router.push("/projects");
            return result;
          } catch (e) {
            return {
              success: false,
              message: "An error occured creating a guest account.",
              error: "Failed to create guest account",
            };
          }
        }
      }
    },
    initialState,
  );

  function handleSignInAsUser(formData: FormData) {
    dispatchAction({ type: "USER", formData });
  }

  function handleSignInAsGuest() {
    startTransition(() => {
      dispatchAction({ type: "GUEST" });
    });
  }

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

      <form className="grid w-full gap-6" action={handleSignInAsUser}>
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
      {state?.error && (
        <FormError className="text-center text-sm text-destructive">
          {state.message}
        </FormError>
      )}
      {pending && <Spinner />}
    </motion.div>
  );
}
