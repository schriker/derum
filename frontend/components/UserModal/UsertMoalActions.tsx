import { Box } from '@material-ui/core';
import React from 'react';
import {
  AuthorFragmentFragmentDoc,
  useIgnoreUserMutation,
  useMeQuery,
  useRemoveIgnoreUserMutation,
  useUserQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import LockIcon from '../Icons/LockIcon';
import MessageIcon from '../Icons/MessageIcon';
import UnLockIcon from '../Icons/UnLockIcon';
import UserModalAdminActions from './UserModalAdminActions';
import useUserModalStyles from './UserModalStyles';

const UserModalActions = ({ id }: { id: number }): JSX.Element => {
  const classes = useUserModalStyles();
  const { data: me } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { data } = useUserQuery({
    variables: {
      id,
    },
  });
  const [ignoreUser, { loading: ignoreLoading }] = useIgnoreUserMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update(cache) {
      cache.modify({
        id: cache.identify(me.me),
        fields: {
          ignore(prev) {
            const ignoredUserRef = cache.writeFragment({
              data: data.user,
              fragment: AuthorFragmentFragmentDoc,
            });
            return [...prev, ignoredUserRef];
          },
        },
      });
    },
  });
  const [removeIgnoreUser, { loading: unignoreLoading }] =
    useRemoveIgnoreUserMutation({
      onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
      update(cache) {
        cache.modify({
          id: cache.identify(me.me),
          fields: {
            ignore(prev, { readField }) {
              return prev.filter((ignore) => id !== readField('id', ignore));
            },
          },
        });
      },
    });
  const isLoading = ignoreLoading || unignoreLoading;
  const isIgnored = me?.me.ignore.some((user) => user.id === id);

  const handleIgnore = () => {
    const variables = {
      id,
    };

    if (!isIgnored)
      return ignoreUser({
        variables,
      });

    removeIgnoreUser({
      variables,
    });
  };

  return me ? (
    <Box className={classes.buttons}>
      <ButtonPrimary endIcon={<MessageIcon />}>Wiadomość</ButtonPrimary>
      <ButtonSecondary
        disabled={isLoading}
        onClick={handleIgnore}
        endIcon={isIgnored ? <UnLockIcon /> : <LockIcon />}
      >
        {isIgnored ? 'Odblokuj' : 'Zablokuj'}
      </ButtonSecondary>
      {me.me.isAdmin && <UserModalAdminActions userData={data} />}
    </Box>
  ) : null;
};

export default UserModalActions;
