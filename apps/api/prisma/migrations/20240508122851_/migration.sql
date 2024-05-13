/*
  Warnings:

  - You are about to drop the column `wayX` on the `seatevents` table. All the data in the column will be lost.
  - You are about to drop the column `wayY` on the `seatevents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `seatevents` DROP COLUMN `wayX`,
    DROP COLUMN `wayY`;
