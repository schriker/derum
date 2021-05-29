import { Box } from '@material-ui/core';
import gql from 'graphql-tag';
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
import LockIcon from '../Icons/LockIcon';
import MessageIcon from '../Icons/MessageIcon';
import UnLockIcon from '../Icons/UnLockIcon';
import useUserModalStyles from './UserModalStyles';

const UserModalActions = ({ id }: { id: number }) => {
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
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
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
      onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
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

    if (!isIgnored) {
      ignoreUser({
        variables,
      });
    } else {
      removeIgnoreUser({
        variables,
      });
    }
  };

  return me ? (
    <Box className={classes.buttons}>
      <ButtonPrimary color="primary" endIcon={<MessageIcon />}>
        Wiadomość
      </ButtonPrimary>
      <ButtonPrimary
        disabled={isLoading}
        onClick={handleIgnore}
        color="secondary"
        endIcon={isIgnored ? <UnLockIcon /> : <LockIcon />}
      >
        {isIgnored ? 'Odblokuj' : 'Zablokuj'}
      </ButtonPrimary>
    </Box>
  ) : null;
};

export default UserModalActions;
