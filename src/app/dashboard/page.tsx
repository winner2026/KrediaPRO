import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { CalculateDashboard } from "@/core/usecases/CalculateDashboard";
import { GenerateAlerts } from "@/core/usecases/GenerateAlerts";
import DashboardView from "./DashboardView";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) redirect("/auth/login");

  const repo = new NeonCardRepository();
  const usecase = new CalculateDashboard(repo);
  const alertsUC = new GenerateAlerts(repo);

  const data = await usecase.execute(session.value);
  const alerts = await alertsUC.execute(session.value);

  if (!data) {
    redirect("/onboarding");
  }

  return <DashboardView data={data} alerts={alerts} />;
}
