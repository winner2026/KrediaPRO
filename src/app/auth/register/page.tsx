import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const session = (await cookies()).get("session");

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
