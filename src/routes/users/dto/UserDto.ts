import { Nomination, NominationRating, User } from '@prisma/client';
import { NominationVote } from '@prisma/client';

interface FullUser extends Partial<User> {
  SavedNominations?: Nomination[];
  NominationVotes?: NominationVote[];
  NominationRatings?: NominationRating[];
}

export default class UserDto {
  constructor(user: FullUser) {
    this.id = user.id;
    this.email = user.email;
    this.imageSrc = user.imageSrc;
    this.displayName = user.displayName;
    this.fullName = user.fullName;
    this.role = user.role;
    this.isEmailVerified = user.isEmailVerified;
    this.savedNominations = user.SavedNominations;
    this.nominationVotes = user.NominationVotes;
    this.nominationRatings = user.NominationRatings;
  }

  readonly id;
  readonly email;
  readonly imageSrc;
  readonly displayName;
  readonly fullName;
  readonly role;
  readonly isEmailVerified;
  readonly savedNominations?;
  readonly nominationVotes?;
  readonly nominationRatings?;
}
