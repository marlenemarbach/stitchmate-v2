import { Label } from "@/app/ui/Label";
import { Card } from "../../ui/Card";
import { FormField } from "../../ui/Formfield";
import { Link } from "../../ui/Link";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";

export default function ResetPassword() {
  return (
    <>
      <Card>
        <h1 className="col-span-2 text-lg text-center max-w-[200px] m-auto">
          {"Things happen. We'll fix that in a minute!"}
        </h1>
        <form className="flex flex-col gap-6 w-full col-span-2">
          <FormField>
            <Label htmlFor="email">Enter your Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="name@email.com"
              required
            />
          </FormField>
          <p className="text-center text-foreground/50 text-xs max-w-3xs mx-auto">
            A link to set a new password will be send to your email account.
          </p>

          <Button type="submit" className="place-self-end">
            Confirm
          </Button>
        </form>
      </Card>
      <Link variant="ghost" href="/login">
        Back to Login
      </Link>
    </>
  );
}
