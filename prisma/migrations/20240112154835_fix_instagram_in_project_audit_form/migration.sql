/*
  Warnings:

  - You are about to drop the column `socialInstargram` on the `ProjectAuditForm` table. All the data in the column will be lost.
  - Added the required column `socialInstagram` to the `ProjectAuditForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectAuditForm" DROP COLUMN "socialInstargram",
ADD COLUMN     "socialInstagram" TEXT NOT NULL;
