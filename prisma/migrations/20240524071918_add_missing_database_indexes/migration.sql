-- CreateIndex
CREATE INDEX "NominationComment_repliedToNominationId_repliedToCommentId_idx" ON "NominationComment"("repliedToNominationId", "repliedToCommentId");

-- CreateIndex
CREATE INDEX "NominationView_nominationId_idx" ON "NominationView"("nominationId");
