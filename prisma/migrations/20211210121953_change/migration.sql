/*
  Warnings:

  - You are about to drop the column `reservationId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_reservationId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "reservationId";

-- CreateTable
CREATE TABLE "_ReservationToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToSchedule_AB_unique" ON "_ReservationToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToSchedule_B_index" ON "_ReservationToSchedule"("B");

-- AddForeignKey
ALTER TABLE "_ReservationToSchedule" ADD FOREIGN KEY ("A") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationToSchedule" ADD FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
