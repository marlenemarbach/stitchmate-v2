-- Rename status value 'finished' to 'completed'
UPDATE `projects` SET `status` = 'completed' WHERE `status` = 'finished';
