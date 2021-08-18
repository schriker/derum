import React from 'react';
import Popper from '@material-ui/core/Popper';
import { SearchDropdownProps } from '../../types/search';
import useSearchDropdownStyles from './SearchDropdownStyles';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Box, Hidden, Typography } from '@material-ui/core';
import SearchUsersList from '../SearchLists/SearchUsersList';
import SearchEntriesList from '../SearchLists/SearchEntriesList';
import SearchCommentsList from '../SearchLists/SearchCommentsList';

const SearchDropdown = ({ anchorEl, data, loading }: SearchDropdownProps) => {
  const classes = useSearchDropdownStyles();

  const noResults =
    !data?.search.users.length &&
    !data?.search.comments.length &&
    !data?.search.entires.length &&
    !loading;

  return (
    <>
      <Hidden smDown>
        <Popper
          id="search-results"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          className={`${classes.wrapper} scrollbar`}
          disablePortal={true}
        >
          {loading && <LoadingSpinner />}
          {data && <SearchUsersList users={data.search.users} />}
          {data && <SearchEntriesList entries={data.search.entires} />}
          {data && <SearchCommentsList comments={data.search.comments} />}
          {noResults && (
            <Box className={classes.noResults}>
              <Typography color="textSecondary">Brak wyników</Typography>
            </Box>
          )}
        </Popper>
      </Hidden>
      <Hidden mdUp>
        <Box mt={1}>
          {data && <SearchUsersList users={data.search.users} />}
          {data && <SearchEntriesList entries={data.search.entires} />}
          {data && <SearchCommentsList comments={data.search.comments} />}
          {noResults && (
            <Box className={classes.noResults}>
              <Typography color="textSecondary">Brak wyników</Typography>
            </Box>
          )}
        </Box>
      </Hidden>
    </>
  );
};

export default SearchDropdown;
