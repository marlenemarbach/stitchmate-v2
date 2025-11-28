"use client";

import { type ActionResponse, signUp } from "@/app/actions/auth";
import { FieldError, Form, FormError, FormField } from "@/app/ui/Form";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Link } from "../../ui/Link";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export default function Signup() {
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
    <>
      <Card>
        <div>
          <h2 className="text-xl text-center font-serif mb-4">
            Ready to cast on?
            <br />
            We have you setup real quick!
          </h2>
        </div>
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
            <FieldError id="email-error">{state?.errors?.email}</FieldError>
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
            <FieldError id="password-error">
              {state?.errors?.password}
            </FieldError>
          </FormField>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          {state?.error && (
            <FormError className="text-destructive text-center">
              {state.message}
            </FormError>
          )}
        </Form>
      </Card>
      <span className="font-serif text-muted-foreground">
        {`Already have an account? `}
        <Link className="text-base" size="fit" href="/login">
          Login
        </Link>
      </span>
    </>
  );
}
