-- CreateEnum
CREATE TYPE "Campus" AS ENUM ('Seoul', 'Global');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "campus" "Campus" NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "isManaged" BOOLEAN NOT NULL DEFAULT false,
    "activateTime" TEXT NOT NULL DEFAULT E'',
    "teminatedTime" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "finish" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studyroom" (
    "id" SERIAL NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "roomNumber" TEXT NOT NULL,
    "roomPassword" TEXT NOT NULL,

    CONSTRAINT "Studyroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");
