import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class RegisterUser {
  constructor(private users: UserRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const user: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      createdAt: new Date(),
    };

    await this.users.create(user);
    return user;
  }
}
