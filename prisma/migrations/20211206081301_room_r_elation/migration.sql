-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_reserveId_fkey";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "reserveId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
