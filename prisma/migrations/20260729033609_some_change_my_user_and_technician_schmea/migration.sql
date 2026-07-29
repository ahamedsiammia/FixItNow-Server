/*
  Warnings:

  - You are about to drop the column `userId` on the `technicianProfiles ` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "technicianProfiles " DROP CONSTRAINT "technicianProfiles _userId_fkey";

-- DropIndex
DROP INDEX "technicianProfiles _userId_key";

-- AlterTable
ALTER TABLE "technicianProfiles " DROP COLUMN "userId";
