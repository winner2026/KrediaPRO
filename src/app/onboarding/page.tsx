import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OnboardingForm from "./OnboardingForm";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";

export default async function OnboardingPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/auth/login");
  }

  const repo = new NeonCardRepository();
  const card = await repo.findByUser(session.value);

  if (card) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kredia</h1>
          <p className="text-gray-600">Configura tu tarjeta en 30 segundos</p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
