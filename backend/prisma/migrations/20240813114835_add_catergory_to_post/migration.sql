/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "category" TEXT;

-- Update existing rows
UPDATE "Post" SET "category" = 'default' WHERE "category" IS NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "category" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

