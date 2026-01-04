ALTER TABLE `reminder` RENAME COLUMN "kind" TO "type";--> statement-breakpoint
ALTER TABLE `reminder` RENAME COLUMN "step" TO "interval";--> statement-breakpoint
ALTER TABLE `reminder` DROP COLUMN `count`;