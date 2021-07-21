import { VoteValueEnum } from '../generated/graphql';

export type VotePropsType = {
  disabled: boolean;
  voteScore: number;
  comments?: boolean;
  userVote: VoteValueEnum;
  handleClick: (voteValue: VoteValueEnum) => void;
};
