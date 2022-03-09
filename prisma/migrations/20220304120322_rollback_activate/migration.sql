/*
  Warnings:

  - You are about to drop the column `activation` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QRModel" ADD COLUMN     "activate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activation";
