import { SignupForm } from "@/components/SignupForm";
import { getCurrentUser } from "@/lib/dal";

export default async function Signup() {
  const user = await getCurrentUser();

  return <SignupForm user={user} />;
}
