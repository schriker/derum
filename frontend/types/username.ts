import { AuthorFragmentFragment, Maybe, PhotoFragmentFragment } from '../generated/graphql';

export type UsernameWithModalPropsType = {
  data: { __typename?: 'User' } & {
    photo?: Maybe<{ __typename?: 'Photo' } & PhotoFragmentFragment>;
  } & AuthorFragmentFragment;
  photo?: boolean;
};
