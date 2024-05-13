/*
  Warnings:

  - Made the column `eventId` on table `eventtransactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `eventtransactions` DROP FOREIGN KEY `eventTransactions_eventId_fkey`;

-- AlterTable
ALTER TABLE `eventtransactions` MODIFY `eventId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `eventTransactions` ADD CONSTRAINT `eventTransactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
