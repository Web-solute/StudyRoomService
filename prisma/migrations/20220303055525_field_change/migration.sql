/*
  Warnings:

  - You are about to drop the column `acvtive` on the `QRModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QRModel" DROP COLUMN "acvtive",
ADD COLUMN     "activate" BOOLEAN NOT NULL DEFAULT false;
