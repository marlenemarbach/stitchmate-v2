"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../actions/auth";
import { ActionResponse } from "../actions/types";
import { Button } from "./ui/Button";
import { Form, FormError, FormField } from "./ui/Form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

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
    <Form action={formAction}>
      <FormField>
        <label className="pl-1" htmlFor="email">
          Your Email
        </label>
        <Input
          className="h-10"
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
        <label htmlFor="password">Password</label>
        <Input
          className="h-10"
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
      <Button type="submit" className="h-10 w-full">
        Login
      </Button>
      {state?.error && (
        <FormError className="text-center text-destructive">
          {state.message}
        </FormError>
      )}
    </Form>
  );
}
