/*
  Warnings:

  - You are about to drop the column `category` on the `Nomination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nomination" DROP COLUMN "category",
ADD COLUMN     "categories" "ProjectCategory"[];
