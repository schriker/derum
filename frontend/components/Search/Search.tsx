import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { SearchQuery, useSearchLazyQuery } from '../../generated/graphql';
import SearchInput from '../SearchInput/SearchInput';
import useSearchStyles from './SearchStyles';
import { useDebouncedCallback } from 'use-debounce';
import SearchDropdown from './SearchDropdown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useRef } from 'react';

const Search = () => {
  const classes = useSearchStyles();
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchQuery>(null);
  const [search, { loading: loadingSearch, data }] = useSearchLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    search({
      variables: {
        query: query,
      },
    });
  }, 500);

  useEffect(() => {
    if (data) {
      setSearchResult(data);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(loadingSearch);
  }, [loadingSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setQuery(e.target.value);
    setAnchorEl(ref.current);
    debouncedSearch(e.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFocus = () => {
    if (data) {
      setAnchorEl(ref.current);
    }
  };

  return (
    <Box className={classes.wrapper}>
      <ClickAwayListener onClickAway={handleClose}>
        <Box {...{ ref: ref }} className={classes.searchPopperWrapper}>
          <SearchInput
            value={query}
            placeholder="Szukaj"
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <SearchDropdown
            data={searchResult}
            anchorEl={anchorEl}
            loading={isLoading || loadingSearch}
          />
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default Search;
