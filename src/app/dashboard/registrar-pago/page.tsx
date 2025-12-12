import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegistrarPagoForm from "./RegistrarPagoForm";

export default async function RegistrarPagoPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) redirect("/auth/login");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registrar un Pago</h1>
      <RegistrarPagoForm />
    </div>
  );
}
