-- DropIndex
DROP INDEX `events_title_eventLocation_idx` ON `events`;

-- CreateIndex
CREATE FULLTEXT INDEX `events_title_idx` ON `events`(`title`);
