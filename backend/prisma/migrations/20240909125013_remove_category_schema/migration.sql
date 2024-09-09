/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Category" DROP CONSTRAINT "_Category_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category" DROP CONSTRAINT "_Category_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_Category";
