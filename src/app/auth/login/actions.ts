"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NeonUserRepository } from "@/infrastructure/repositories/NeonUserRepository";
import { LoginUser } from "@/core/usecases/LoginUser";

export async function loginAction({ email, password }: { email: string; password: string }) {
  const repo = new NeonUserRepository();
  const usecase = new LoginUser(repo);

  const user = await usecase.execute({ email, password });

  (await cookies()).set("session", user.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/dashboard");
}
