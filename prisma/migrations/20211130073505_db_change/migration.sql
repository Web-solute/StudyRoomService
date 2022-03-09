/*
  Warnings:

  - Added the required column `major` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `major` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "major" "Major" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "major",
ADD COLUMN     "major" "Major" NOT NULL;
