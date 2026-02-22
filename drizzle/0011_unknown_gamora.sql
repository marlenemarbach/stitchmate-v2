PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`direction` integer DEFAULT 1 NOT NULL,
	`name` text(30) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`status` text DEFAULT 'wip' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "user_id", "count", "direction", "name", "created_at", "updated_at", "status") SELECT "id", "user_id", "count", "direction", "name", "created_at", "updated_at", "status" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_sub_counters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`interval` integer DEFAULT 2 NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`start_row` integer DEFAULT 1 NOT NULL,
	`active` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sub_counters`("id", "project_id", "interval", "created_at", "updated_at", "start_row", "active") SELECT "id", "project_id", "interval", "created_at", "updated_at", "start_row", "active" FROM `sub_counters`;--> statement-breakpoint
DROP TABLE `sub_counters`;--> statement-breakpoint
ALTER TABLE `__new_sub_counters` RENAME TO `sub_counters`;--> statement-breakpoint
CREATE UNIQUE INDEX `sub_counters_projectId_unique` ON `sub_counters` (`project_id`);