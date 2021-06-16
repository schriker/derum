import { VoteValueEnum } from '../generated/graphql';

export type VotePropsType = {
  voteScore: number;
  comments?: boolean;
  userVote: VoteValueEnum;
  handleClick: (voteValue: VoteValueEnum) => void;
};
