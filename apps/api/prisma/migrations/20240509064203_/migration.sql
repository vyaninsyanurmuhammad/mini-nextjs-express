/*
  Warnings:

  - You are about to drop the column `eventId` on the `tickettransactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tickettransactions` DROP FOREIGN KEY `TicketTransactions_eventId_fkey`;

-- AlterTable
ALTER TABLE `eventtransactions` ADD COLUMN `eventId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tickettransactions` DROP COLUMN `eventId`;

-- AddForeignKey
ALTER TABLE `eventTransactions` ADD CONSTRAINT `eventTransactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
