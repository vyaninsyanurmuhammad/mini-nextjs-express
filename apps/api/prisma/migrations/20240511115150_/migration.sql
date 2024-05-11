-- CreateIndex
CREATE FULLTEXT INDEX `events_title_eventLocation_idx` ON `events`(`title`, `eventLocation`);
