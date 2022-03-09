-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_reserveId_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
