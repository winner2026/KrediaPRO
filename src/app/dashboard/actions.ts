"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { RegisterPayment } from "@/core/usecases/RegisterPayment";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";

export async function registerPaymentAction({ monto }: { monto: number }) {
  const session = (await cookies()).get("session");

  if (!session) redirect("/auth/login");

  const repo = new NeonCardRepository();
  const usecase = new RegisterPayment(repo);

  await usecase.execute({
    userId: session.value,
    monto,
  });

  redirect("/dashboard");
}
