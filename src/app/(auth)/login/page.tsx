"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/actions/auth";
import { type ActionResponse } from "@/app/actions/types";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Form, FormError, FormField } from "@/app/components/ui/Form";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";

const initialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export default function Login() {
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
    <Card>
      <h2 className="m-auto max-w-[200px] text-center font-serif text-xl">
        {"Grep your needles and start crafting!"}
      </h2>
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
          <Label htmlFor="password">Enter your password</Label>
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
          Login
        </Button>
        {state?.error && (
          <FormError className="text-center text-destructive">
            {state.message}
          </FormError>
        )}
      </Form>
      <div className="mt-3 grid grid-cols-2 gap-6 border-t border-border pt-6">
        <h2 className="col-span-2 text-center font-serif text-lg">
          No account?
        </h2>
        <Link href="/signup">Sign up</Link>
        <Link className="px-0" href="/">
          Continue as guest
        </Link>
        <p className="col-span-2 m-auto max-w-3xs text-center text-xs text-foreground/50">
          {`You can explore stitchmate as a guest, but your work cannot be saved. `}
          <Link className="text-xs" href="/signup">
            Sign up
          </Link>
          anytime.
        </p>
      </div>
    </Card>
  );
}
