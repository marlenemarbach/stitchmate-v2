"use client";

import { ActionResponse, signIn } from "@/app/actions/auth";
import { Button } from "@/app/ui/Button";
import { Card } from "@/app/ui/Card";
import { FieldError, Form, FormError, FormField } from "@/app/ui/Form";
import { Input } from "@/app/ui/Input";
import { Label } from "@/app/ui/Label";
import { Link } from "@/app/ui/Link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

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
      <h2 className="text-xl text-center font-serif max-w-[200px] m-auto">
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
          <FieldError id="email-error">{state?.errors?.email}</FieldError>
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
          <FieldError id="password-error">{state?.errors?.password}</FieldError>
        </FormField>
        <Button type="submit" className="w-full">
          Login
        </Button>
        {state?.error && (
          <FormError className="text-destructive text-center">
            {state.message}
          </FormError>
        )}
      </Form>
      <div className="border-t border-border grid grid-cols-2 gap-6 pt-6 mt-3">
        <h2 className="text-center text-lg col-span-2 font-serif">
          No account?
        </h2>
        <Link variant="secondary" href="/signup">
          Sign up
        </Link>
        <Link variant="secondary" className="px-0" href="/">
          Continue as guest
        </Link>
        <p className="col-span-2 text-center text-foreground/50 text-xs max-w-3xs m-auto">
          {`You can explore stitchmate as a guest, but your work cannot be saved. `}
          <Link className="text-xs" size="fit" href="/signup">
            Sign up
          </Link>{" "}
          anytime.
        </p>
      </div>
    </Card>
  );
}
