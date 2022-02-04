/*
  Warnings:

  - You are about to drop the `_ItemToList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToList" DROP CONSTRAINT "_ItemToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToList" DROP CONSTRAINT "_ItemToList_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "listId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ItemToList";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
