-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('DEFI', 'DEVELOPER_TOOLING', 'GAMING', 'INFRASTRACTURE', 'NFT', 'SOCIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ApprovalStage" AS ENUM ('PENDING', 'VOTE_APPROVED', 'RATE_APPROVED');

-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageSrc" TEXT,
    "displayName" TEXT,
    "fullName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedTermsAndConditions" BOOLEAN NOT NULL DEFAULT false,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nomination" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ProjectCategory"[],
    "socialX" TEXT,
    "socialInstagram" TEXT,
    "socialDiscord" TEXT,
    "otherInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalStage" "ApprovalStage" NOT NULL DEFAULT 'PENDING',
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Nomination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NominationVote" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "vote" "Vote" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nominationId" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,

    CONSTRAINT "NominationVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NominationRating" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nominationId" TEXT NOT NULL,
    "raterId" TEXT NOT NULL,

    CONSTRAINT "NominationRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NominationComment" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "numberOfChildren" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "repliedToNominationId" TEXT,
    "repliedToCommentId" TEXT,

    CONSTRAINT "NominationComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NominationView" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "nominationId" TEXT NOT NULL,

    CONSTRAINT "NominationView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectAuditForm" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "founderDescription" TEXT NOT NULL,
    "presentationSrc" TEXT NOT NULL,
    "category" "ProjectCategory"[],
    "socialEmail" TEXT NOT NULL,
    "socialX" TEXT NOT NULL,
    "socialInstargram" TEXT NOT NULL,
    "socialDiscord" TEXT NOT NULL,
    "socialTelegram" TEXT,
    "otherInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "ProjectAuditForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_savers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_displayName_key" ON "User"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "NominationView_ipAddress_key" ON "NominationView"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "_savers_AB_unique" ON "_savers"("A", "B");

-- CreateIndex
CREATE INDEX "_savers_B_index" ON "_savers"("B");

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationVote" ADD CONSTRAINT "NominationVote_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationVote" ADD CONSTRAINT "NominationVote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationRating" ADD CONSTRAINT "NominationRating_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationRating" ADD CONSTRAINT "NominationRating_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationComment" ADD CONSTRAINT "NominationComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationComment" ADD CONSTRAINT "NominationComment_repliedToNominationId_fkey" FOREIGN KEY ("repliedToNominationId") REFERENCES "Nomination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationComment" ADD CONSTRAINT "NominationComment_repliedToCommentId_fkey" FOREIGN KEY ("repliedToCommentId") REFERENCES "NominationComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationView" ADD CONSTRAINT "NominationView_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAuditForm" ADD CONSTRAINT "ProjectAuditForm_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savers" ADD CONSTRAINT "_savers_A_fkey" FOREIGN KEY ("A") REFERENCES "Nomination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savers" ADD CONSTRAINT "_savers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
