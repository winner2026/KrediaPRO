"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { RegisterTransaction } from "@/core/usecases/RegisterTransaction";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { NeonTransactionRepository } from "@/infrastructure/repositories/NeonTransactionRepository";

export async function registerTransactionAction({
  monto,
  descripcion,
}: {
  monto: number;
  descripcion: string;
}) {
  const session = (await cookies()).get("session");
  if (!session) redirect("/auth/login");

  const uc = new RegisterTransaction(
    new NeonCardRepository(),
    new NeonTransactionRepository()
  );

  await uc.execute({
    userId: session.value,
    monto,
    descripcion,
  });

  redirect("/dashboard");
}
