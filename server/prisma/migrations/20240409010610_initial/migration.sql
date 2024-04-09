/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FirstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Users` DROP PRIMARY KEY,
    DROP COLUMN `FirstName`,
    DROP COLUMN `UserID`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
