import { LoginForm } from "./LoginForm";
import { Card } from "@/app/ui/Card";
import { Link } from "@/app/ui/Link";

export default function Login() {
  return (
    <>
      <Card>
        <h1 className="text-lg text-center max-w-[200px] m-auto">
          {"Grep your needles and start crafting!"}
        </h1>
        <LoginForm />
      </Card>
      <Card className="grid grid-cols-2 gap-x-2">
        <h2 className="text-center text-lg col-span-2">No account?</h2>
        <Link href="/signup" variant="secondary">
          Sign up
        </Link>
        <Link className="px-0" href="/" variant="secondary">
          Continue as guest
        </Link>
        <p className="col-span-2 text-center text-foreground/50 text-xs max-w-3xs m-auto">
          You can explore stitchmate as a guest, but your work cannot be saved.
          Sign up anytime.
        </p>
      </Card>
    </>
  );
}
