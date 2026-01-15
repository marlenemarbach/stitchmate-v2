"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
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
    <form className="grid w-full gap-3" action={formAction}>
      <FormField>
        <label htmlFor="email">Email</label>
        <Input
          className="h-11"
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
          className="h-11"
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
      <Button className="mt-3 h-10 w-full" disabled={pending} type="submit">
        Login
      </Button>
      {state?.error && (
        <FormError className="text-center text-sm text-destructive">
          {state.message}
        </FormError>
      )}
    </form>
  );
}
