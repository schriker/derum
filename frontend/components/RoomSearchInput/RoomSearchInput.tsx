import { Box, FormControl, InputLabel, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { indexRoomVars } from '../../consts';
import {
  usePopularRoomsQuery,
  useSearchRoomLazyQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { RoomSearchProps } from '../../types/room';
import { CustomInput } from '../CustomInput/CustomInput';
import SearchIcon from '../Icons/SearchIcon';
import SidebarDrawerItem from '../Sidebar/SidebarDrawerItem';
import useRoomSearchAutocompleteStyles from './RoomSearchAutocompleteStyles';
import useRoomSearchInputStyles from './RoomSearchInputStyles';

const RoomSearchInput = ({ error, onSelect, placeholder }: RoomSearchProps) => {
  const classes = useRoomSearchInputStyles();
  const { roomData } = useRoomData();
  const autoCompleteClasses = useRoomSearchAutocompleteStyles();
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const { loading: popularRoomsLoading } = usePopularRoomsQuery({
    variables: {
      limit: 15,
    },
    onCompleted: (data) => {
      setOptions(data.popularRooms);
    },
  });
  const [searchRoom, { loading: searchLoading }] = useSearchRoomLazyQuery({
    onCompleted: (data) => {
      setOptions(data.searchRooms);
    },
  });

  useEffect(() => {
    if (roomData && !placeholder && roomData.room.name !== indexRoomVars.name) {
      onSelect(roomData.room.id, roomData.room.name);
    }
  }, [roomData]);

  const isLoading = searchLoading || popularRoomsLoading;

  const handleChange = (_, value) => {
    if (value.length > 2)
      return searchRoom({
        variables: {
          name: value,
        },
      });
  };

  const handleSelect = (_, value) => {
    if (value) return onSelect(value.id, value.name);
    return onSelect(undefined);
  };

  return (
    <Box style={{ width: '100%', margin: '0 0 10px 0' }}>
      <Autocomplete
        defaultValue={
          placeholder
            ? null
            : roomData && roomData?.room.name !== indexRoomVars.name
            ? { id: roomData.room.id, name: roomData.room.name }
            : null
        }
        noOptionsText="Brak wyników."
        loadingText="Szukam..."
        classes={autoCompleteClasses}
        id="combo-box-demo"
        options={options}
        renderOption={(option) => (
          <SidebarDrawerItem
            name={option.name}
            usersNumber={option.usersNumber}
          />
        )}
        getOptionLabel={(option) => option.name}
        loading={isLoading}
        onChange={handleSelect}
        onInputChange={handleChange}
        renderInput={(params) => (
          <FormControl ref={params.InputProps.ref} style={{ width: '100%' }}>
            <InputLabel
              style={{ fontSize: 18 }}
              error={!!error}
              shrink
              htmlFor="search"
            >
              Pokój
            </InputLabel>
            <CustomInput
              bg="light"
              placeholder={placeholder}
              startAdornment={<SearchIcon className={classes.icon} />}
              error={!!error}
              inputProps={{
                maxLength: 150,
                id: 'search',
                ...params.inputProps,
              }}
            />
          </FormControl>
        )}
      />

      {!!error && (
        <Typography variant="subtitle1" color="error">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default RoomSearchInput;
