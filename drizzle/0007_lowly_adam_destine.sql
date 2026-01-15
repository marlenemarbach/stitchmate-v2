PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`direction` integer DEFAULT 1 NOT NULL,
	`name` text(30) NOT NULL,
	`needle_size` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`status` text DEFAULT 'wip' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "user_id", "count", "direction", "name", "needle_size", "created_at", "updated_at", "status") SELECT "id", "user_id", "count", "direction", "name", "needle_size", "created_at", "updated_at", "status" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;