import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GenerateGraphData } from "@/core/usecases/GenerateGraphData";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { NeonTransactionRepository } from "@/infrastructure/repositories/NeonTransactionRepository";

import GraficosView from "./GraficosView";

export default async function GraficosPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  const usecase = new GenerateGraphData(
    new NeonCardRepository(),
    new NeonTransactionRepository()
  );

  const data = await usecase.execute(session.value);

  return <GraficosView data={data} />;
}
