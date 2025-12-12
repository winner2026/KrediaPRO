"use client";

import { FormEvent, useState } from "react";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await registerAction({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold">Crear cuenta</h1>
      <input
        type="email"
        name="email"
        placeholder="Correo"
        className="border w-full p-3 rounded"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="border w-full p-3 rounded"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
        Crear cuenta
      </button>
    </form>
  );
}
