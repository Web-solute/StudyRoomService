-- CreateTable
CREATE TABLE "_QRModelToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QRModelToUser_AB_unique" ON "_QRModelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QRModelToUser_B_index" ON "_QRModelToUser"("B");

-- AddForeignKey
ALTER TABLE "_QRModelToUser" ADD FOREIGN KEY ("A") REFERENCES "QRModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QRModelToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
