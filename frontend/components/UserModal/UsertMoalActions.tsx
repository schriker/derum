import { Box } from '@material-ui/core';
import React from 'react';
import {
  useIgnoreUserMutation,
  useMeQuery,
  useRemoveIgnoreUserMutation,
} from '../../generated/graphql';
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
  const [ignoreUser] = useIgnoreUserMutation({
    errorPolicy: 'ignore',
    update(cache) {
      cache.modify({
        id: cache.identify(me.me),
        fields: {
          ignore(prev) {
            return [...prev, { __ref: `User:${id}` }];
          },
        },
      });
    },
  });
  const [removeIgnoreUser] = useRemoveIgnoreUserMutation({
    errorPolicy: 'ignore',
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

  const isIgnored = me?.me.ignore.some((user) => user.id === id);

  const handleIgnore = () => {
    if (!isIgnored) {
      ignoreUser({
        variables: {
          id,
        },
      });
    } else {
      removeIgnoreUser({
        variables: {
          id,
        },
      });
    }
  };

  return me ? (
    <Box className={classes.buttons}>
      <ButtonPrimary color="primary" endIcon={<MessageIcon />}>
        Wiadomość
      </ButtonPrimary>
      <ButtonPrimary
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
