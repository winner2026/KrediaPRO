/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usage" DROP CONSTRAINT "usage_user_id_fkey";

-- DropForeignKey
ALTER TABLE "voice_sessions" DROP CONSTRAINT "voice_sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "usage" ADD COLUMN     "month_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monthly_analyses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "week_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "weekly_analyses" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "password_hash" TEXT,
    "role" TEXT,
    "goal" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 3,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "magicToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lemon_squeezy_customer_id" TEXT,
    "lemon_squeezy_subscription_id" TEXT,
    "subscription_status" TEXT,
    "subscription_renews_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_magicToken_key" ON "users"("magicToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_lemon_squeezy_customer_id_key" ON "users"("lemon_squeezy_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_lemon_squeezy_subscription_id_key" ON "users"("lemon_squeezy_subscription_id");

-- AddForeignKey
ALTER TABLE "usage" ADD CONSTRAINT "usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_sessions" ADD CONSTRAINT "voice_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
