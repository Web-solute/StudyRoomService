/*
  Warnings:

  - You are about to drop the `_ReservationToSchedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reserveId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ReservationToSchedule" DROP CONSTRAINT "_ReservationToSchedule_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReservationToSchedule" DROP CONSTRAINT "_ReservationToSchedule_B_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "reserveId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ReservationToSchedule";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
