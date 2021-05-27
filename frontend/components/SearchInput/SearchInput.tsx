import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { SearchInputProps } from '../../types/search';
import { CustomInput } from '../CustomInput/CustomInput';
import SearchIcon from '../Icons/SearchIcon';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 18,
    marginRight: 10,
    color: theme.palette.grey[500],
  },
  search: {
    backgroundColor: theme.palette.grey[800],
    marginBottom: theme.spacing(2),
  },
}));

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const classes = useStyles();

  return (
    <CustomInput
      value={value}
      onChange={onChange}
      startAdornment={<SearchIcon className={classes.icon} />}
      className={classes.search}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
