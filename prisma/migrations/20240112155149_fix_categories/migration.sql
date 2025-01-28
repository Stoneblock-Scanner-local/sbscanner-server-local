/*
  Warnings:

  - You are about to drop the column `category` on the `ProjectAuditForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectAuditForm" DROP COLUMN "category",
ADD COLUMN     "categories" "ProjectCategory"[];
