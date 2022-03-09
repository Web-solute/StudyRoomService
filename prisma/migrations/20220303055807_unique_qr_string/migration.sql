/*
  Warnings:

  - A unique constraint covering the columns `[qr]` on the table `QRModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QRModel_qr_key" ON "QRModel"("qr");
