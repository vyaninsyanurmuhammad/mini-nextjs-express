/*
  Warnings:

  - You are about to alter the column `total` on the `coupondiscounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `coupondiscounts` MODIFY `total` INTEGER NOT NULL;
