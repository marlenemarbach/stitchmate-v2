"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/auth";
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
    <Form action={formAction}>
      <FormField>
        <Label htmlFor="email">Enter your email</Label>
        <Input
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
        <Label htmlFor="password">Set a password</Label>
        <Input
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
      <Button type="submit" className="w-full">
        Create Account
      </Button>
      {state?.error && (
        <FormError className="text-center text-destructive">
          {state.message}
        </FormError>
      )}
    </Form>
  );
}
