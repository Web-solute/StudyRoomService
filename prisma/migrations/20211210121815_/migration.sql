/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `reservationId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_scheduleId_fkey";

-- DropIndex
DROP INDEX "Reservation_scheduleId_key";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "scheduleId";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "reservationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
