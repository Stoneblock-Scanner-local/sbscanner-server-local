-- DropForeignKey
ALTER TABLE "NominationComment" DROP CONSTRAINT "NominationComment_repliedToNominationId_fkey";

-- DropForeignKey
ALTER TABLE "NominationRating" DROP CONSTRAINT "NominationRating_nominationId_fkey";

-- DropForeignKey
ALTER TABLE "NominationView" DROP CONSTRAINT "NominationView_nominationId_fkey";

-- DropForeignKey
ALTER TABLE "NominationVote" DROP CONSTRAINT "NominationVote_nominationId_fkey";

-- AddForeignKey
ALTER TABLE "NominationVote" ADD CONSTRAINT "NominationVote_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationRating" ADD CONSTRAINT "NominationRating_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationComment" ADD CONSTRAINT "NominationComment_repliedToNominationId_fkey" FOREIGN KEY ("repliedToNominationId") REFERENCES "Nomination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NominationView" ADD CONSTRAINT "NominationView_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
