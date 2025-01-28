/*
  Warnings:

  - The values [INFRASTRACTURE] on the enum `ProjectCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectCategory_new" AS ENUM ('DEFI', 'DEVELOPER_TOOLING', 'GAMING', 'INFRASTRUCTURE', 'NFT', 'SOCIAL', 'OTHER');
ALTER TABLE "Nomination" ALTER COLUMN "categories" TYPE "ProjectCategory_new"[] USING ("categories"::text::"ProjectCategory_new"[]);
ALTER TABLE "ProjectAuditForm" ALTER COLUMN "categories" TYPE "ProjectCategory_new"[] USING ("categories"::text::"ProjectCategory_new"[]);
ALTER TYPE "ProjectCategory" RENAME TO "ProjectCategory_old";
ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";
DROP TYPE "ProjectCategory_old";
COMMIT;
