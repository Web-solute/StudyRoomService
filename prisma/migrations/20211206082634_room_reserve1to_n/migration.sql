/*
  Warnings:

  - You are about to drop the column `reserveId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_reserveId_fkey";

-- DropIndex
DROP INDEX "Room_reserveId_key";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "reserveId";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
