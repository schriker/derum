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
  style,
  ...rest
}: SearchInputProps & React.HTMLProps<HTMLInputElement>) => {
  const classes = useStyles();

  return (
    <CustomInput
      bg="light"
      style={style}
      startAdornment={<SearchIcon className={classes.icon} />}
      {...rest}
    />
  );
};

export default SearchInput;
