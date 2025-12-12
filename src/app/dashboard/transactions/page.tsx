import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegistrarTransaccionForm from "./RegistrarTransaccionForm";

export default async function RegistrarTransaccionPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Registrar consumo</h1>
      <RegistrarTransaccionForm />
    </div>
  );
}
