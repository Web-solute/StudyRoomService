/*
  Warnings:

  - You are about to drop the column `timeId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reservation` table. All the data in the column will be lost.
  - The `finish` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `activateTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teminatedTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Studyroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `start` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `space` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_timeId_fkey";

-- DropForeignKey
ALTER TABLE "Studyroom" DROP CONSTRAINT "Studyroom_timeId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "timeId",
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "start",
ADD COLUMN     "start" INTEGER NOT NULL,
DROP COLUMN "finish",
ADD COLUMN     "finish" INTEGER,
DROP COLUMN "space",
ADD COLUMN     "space" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activateTime",
DROP COLUMN "teminatedTime";

-- DropTable
DROP TABLE "Studyroom";

-- DropTable
DROP TABLE "Time";

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "roomPassword" TEXT NOT NULL DEFAULT E'0000',
    "description" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
