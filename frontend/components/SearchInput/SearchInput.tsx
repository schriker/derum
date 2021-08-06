import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { SearchInputProps } from '../../types/search';
import { CustomInput } from '../CustomInput/CustomInput';
import SearchIcon from '../Icons/SearchIcon';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 18,
    marginRight: 10,
    color: theme.palette.secondary[500],
  },
}));

const SearchInput = ({
  value,
  onChange,
  placeholder,
  style,
}: SearchInputProps) => {
  const classes = useStyles();

  return (
    <CustomInput
      autoFocus
      bg="light"
      style={style}
      value={value}
      onChange={onChange}
      startAdornment={<SearchIcon className={classes.icon} />}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
