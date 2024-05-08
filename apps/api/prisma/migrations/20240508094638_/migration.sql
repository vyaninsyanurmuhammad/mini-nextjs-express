/*
  Warnings:

  - Added the required column `eventImage` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `eventImage` VARCHAR(191) NOT NULL;
