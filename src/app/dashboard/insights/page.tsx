import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GenerateInsights } from "@/core/usecases/GenerateInsights";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { NeonTransactionRepository } from "@/infrastructure/repositories/NeonTransactionRepository";

import InsightsView from "./InsightsView";

export default async function InsightsPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  const usecase = new GenerateInsights(
    new NeonCardRepository(),
    new NeonTransactionRepository()
  );

  const insights = await usecase.execute(session.value);

  return <InsightsView insights={insights} />;
}
