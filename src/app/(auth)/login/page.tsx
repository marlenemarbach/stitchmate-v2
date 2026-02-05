import { LoginForm } from "@/components/LoginForm";
import { mockDelay } from "@/lib/utils";

export default async function Login() {
  await mockDelay(1000);
  return <LoginForm />;
}
