import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { Form } from "@/app/ui/Form";
import { FormField } from "@/app/ui/Formfield";
import { Label } from "@/app/ui/Label";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined);
  return (
    <Form action={action}>
      <FormField>
        <Label htmlFor="email">Enter your email</Label>
        <Input
          name="email"
          type="email"
          placeholder="name@email.com"
          required
        />
      </FormField>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <FormField>
        <Label htmlFor="password">Enter a Password</Label>
        <Input
          placeholder="********"
          name="password"
          type="password"
          minLength={12}
          required
        />
      </FormField>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      <Button type="submit">Create Account</Button>
    </Form>
  );
}
