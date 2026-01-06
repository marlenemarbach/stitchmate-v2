PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sub_counters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`type` text DEFAULT 'increase' NOT NULL,
	`interval` integer DEFAULT 2 NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`start_row` integer DEFAULT 1 NOT NULL,
	`active` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sub_counters`("id", "project_id", "type", "interval", "created_at", "updated_at", "start_row", "active") SELECT "id", "counter_id", "type", "interval", "created_at", "updated_at", "start_row", "active" FROM `sub_counters`;--> statement-breakpoint
DROP TABLE `sub_counters`;--> statement-breakpoint
ALTER TABLE `__new_sub_counters` RENAME TO `sub_counters`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `sub_counters_projectId_unique` ON `sub_counters` (`project_id`);
