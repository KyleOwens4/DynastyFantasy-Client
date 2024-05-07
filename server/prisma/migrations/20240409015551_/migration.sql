/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userID`);
