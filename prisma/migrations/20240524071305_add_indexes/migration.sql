-- CreateIndex
CREATE INDEX "Nomination_categories_approvalStage_title_name_idx" ON "Nomination"("categories", "approvalStage", "title", "name");

-- CreateIndex
CREATE INDEX "NominationRating_nominationId_raterId_idx" ON "NominationRating"("nominationId", "raterId");

-- CreateIndex
CREATE INDEX "NominationVote_nominationId_voterId_idx" ON "NominationVote"("nominationId", "voterId");

-- CreateIndex
CREATE INDEX "User_email_displayName_role_idx" ON "User"("email", "displayName", "role");
