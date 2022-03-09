-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
