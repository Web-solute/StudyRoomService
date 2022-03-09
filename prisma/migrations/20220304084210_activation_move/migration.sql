/*
  Warnings:

  - You are about to drop the column `activate` on the `QRModel` table. All the data in the column will be lost.
  - You are about to drop the `_QRModelToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QRModelToUser" DROP CONSTRAINT "_QRModelToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QRModelToUser" DROP CONSTRAINT "_QRModelToUser_B_fkey";

-- AlterTable
ALTER TABLE "QRModel" DROP COLUMN "activate";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activation" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_QRModelToUser";
