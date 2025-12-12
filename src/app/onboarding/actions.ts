"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { CreateCreditCard } from "@/core/usecases/CreateCreditCard";

export async function createCardAction({
  tasaMensual,
  fechaCorte,
  fechaVencimiento,
}: {
  tasaMensual: number;
  fechaCorte: string;
  fechaVencimiento: string;
}) {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  const repo = new NeonCardRepository();
  const usecase = new CreateCreditCard(repo);

  await usecase.execute({
    userId: session.value,
    tasaMensual,
    fechaCorte: new Date(fechaCorte),
    fechaVencimiento: new Date(fechaVencimiento),
  });

  redirect("/dashboard");
}
