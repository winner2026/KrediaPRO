import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = (await cookies()).get("session");

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
