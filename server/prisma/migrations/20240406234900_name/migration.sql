/*
  Warnings:

  - Added the required column `FirstName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `FirstName` VARCHAR(191) NOT NULL;
