import { Label } from "../../ui/Label";
import { Card } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { FormField } from "../../ui/Formfield";
import { Link } from "../../ui/Link";
import { Button } from "../../ui/Button";

export default function Signup() {
  return (
    <>
      <Card>
        <h1 className="text-lg text-center max-w-[200px] m-auto">
          {"Ready to cast on? We have you setup in a minute!"}
        </h1>
        <form className="grid gap-6 w-full">
          <FormField>
            <Label htmlFor="email">Enter your email</Label>
            <Input
              name="email"
              type="email"
              placeholder="name@email.com"
              required
            />
          </FormField>
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
          <Button type="submit" className="place-self-end">
            Create Account
          </Button>
        </form>
      </Card>
      <Link variant="ghost" href="/login">
        Back to Login
      </Link>
    </>
  );
}
