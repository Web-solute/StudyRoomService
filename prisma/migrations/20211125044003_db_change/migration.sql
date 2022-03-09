-- CreateEnum
CREATE TYPE "Major" AS ENUM ('Computer', 'Information_Communication');

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomPassword" DROP NOT NULL,
ALTER COLUMN "roomPassword" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_reservation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_reservation_AB_unique" ON "_reservation"("A", "B");

-- CreateIndex
CREATE INDEX "_reservation_B_index" ON "_reservation"("B");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reservation" ADD FOREIGN KEY ("A") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_reservation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
