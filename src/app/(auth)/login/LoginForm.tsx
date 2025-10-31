import { Button } from "@/app/ui/Button";
import { FormField } from "@/app/ui/Formfield";
import { Input } from "@/app/ui/Input";
import { Label } from "@/app/ui/Label";
import { Link } from "@/app/ui/Link";

export function LoginForm() {
  return (
    <form className="grid gap-6 w-full">
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="name@email.com"
          required
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="********"
          name="password"
          type="password"
          minLength={12}
          required
        />
        <Link
          href="/reset"
          className="text-foreground-muted justify-end hover:text-foreground"
          variant="ghost"
          size="small"
        >
          I forgot my password
        </Link>
      </FormField>
      <Button type="submit" className="place-self-end">
        Login
      </Button>
    </form>
  );
}
