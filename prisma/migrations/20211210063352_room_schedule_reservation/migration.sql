/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `finish` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `roomPassword` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduleId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[major,roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduleId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_roomId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "finish",
DROP COLUMN "start",
ADD COLUMN     "scheduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomPassword";

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "finish" INTEGER NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToSchedule_AB_unique" ON "_RoomToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToSchedule_B_index" ON "_RoomToSchedule"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_roomId_key" ON "Reservation"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_scheduleId_key" ON "Reservation"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_major_roomNumber_key" ON "Room"("major", "roomNumber");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToSchedule" ADD FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToSchedule" ADD FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
