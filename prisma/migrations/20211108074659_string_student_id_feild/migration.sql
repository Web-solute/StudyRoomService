/*
  Warnings:

  - You are about to drop the column `isReserved` on the `Studyroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timeId]` on the table `Studyroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Studyroom` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `roomNumber` on the `Studyroom` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Studyroom" DROP COLUMN "isReserved",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "timeId" INTEGER,
DROP COLUMN "roomNumber",
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
ALTER COLUMN "roomPassword" SET DEFAULT E'0000';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "timeId" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Studyroom_timeId_key" ON "Studyroom"("timeId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studyroom" ADD CONSTRAINT "Studyroom_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE SET NULL ON UPDATE CASCADE;
