import React from 'react';
import Popper from '@material-ui/core/Popper';
import { SearchDropdownProps } from '../../types/search';
import useSearchDropdownStyles from './SearchDropdownStyles';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import SearchUsersList from './SearchUsersList';
import { Box, Typography } from '@material-ui/core';

const SearchDropdown = ({ anchorEl, data, loading }: SearchDropdownProps) => {
  const classes = useSearchDropdownStyles();

  const noResults =
    !data?.search.users.length &&
    !data?.search.comments.length &&
    !data?.search.entires.length &&
    !loading;

  return (
    <Popper
      id="search-results"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      className={classes.wrapper}
      disablePortal={true}
    >
      {loading && <LoadingSpinner />}
      {data && <SearchUsersList users={data.search.users} />}
      {noResults && (
        <Box className={classes.noResults}>
          <Typography color="textSecondary">Brak wyników</Typography>
        </Box>
      )}
    </Popper>
  );
};

export default SearchDropdown;
