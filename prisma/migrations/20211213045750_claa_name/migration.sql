/*
  Warnings:

  - Added the required column `class` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "class" TEXT NOT NULL;
