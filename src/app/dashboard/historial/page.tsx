import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { NeonTransactionRepository } from "@/infrastructure/repositories/NeonTransactionRepository";
import { ListTransactionsByCard } from "@/core/usecases/ListTransactionsByCard";
import HistorialView from "./HistorialView";

export default async function HistorialPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  const usecase = new ListTransactionsByCard(
    new NeonCardRepository(),
    new NeonTransactionRepository()
  );

  const transacciones = await usecase.execute(session.value);

  return <HistorialView transacciones={transacciones} />;
}
