"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NeonUserRepository } from "@/infrastructure/repositories/NeonUserRepository";
import { RegisterUser } from "@/core/usecases/RegisterUser";

export async function registerAction({ email, password }: { email: string; password: string }) {
  const repo = new NeonUserRepository();
  const usecase = new RegisterUser(repo);

  const user = await usecase.execute({ email, password });

  (await cookies()).set("session", user.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
  });

  redirect("/onboarding");
}
