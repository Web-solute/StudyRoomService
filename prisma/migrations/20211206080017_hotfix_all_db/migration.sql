/*
  Warnings:

  - You are about to drop the column `space` on the `Reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reserveId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Made the column `finish` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `reserveId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "space",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "finish" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "closed" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "open" TEXT,
ADD COLUMN     "reserveId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_reserveId_key" ON "Room"("reserveId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
