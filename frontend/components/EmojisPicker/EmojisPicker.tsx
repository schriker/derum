import { Box, Popover } from '@material-ui/core';
import React, { useState } from 'react';
import { useGlobalEmojisQuery } from '../../generated/graphql';
import { EmojisPickerPropsType } from '../../types/emojis';
import SearchInput from '../SearchInput/SearchInput';
import EmojisPickerEmoji from './EmojisPickerEmoji';
import EmojisPickerPreview from './EmojisPickerPreview';
import useEmojisPickerStyles from './EmojisStyles';

const EmojisPicker = ({
  isOpen,
  handleClose,
  anchorEl,
  onSelect,
  setInpuFocus,
}: EmojisPickerPropsType): JSX.Element => {
  const classes = useEmojisPickerStyles();
  const [searchValue, setSearchValue] = useState('');
  const [hoveredEmoji, setHoveredEmoji] = useState(0);
  const { data } = useGlobalEmojisQuery();

  const emojis = data?.globalEmojis.filter((emoji) =>
    emoji.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoveredEmoji(0);
    setSearchValue(event.target.value);
  };

  const handleHover = (index: number) => {
    setHoveredEmoji(index);
  };

  const handleClick = (name: string) => {
    onSelect(name);
  };
  return (
    <Popover
      onExited={() => {
        setInpuFocus();
      }}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Box>
        <Box className={classes.emojisWrapper}>
          <SearchInput
            style={{
              marginBottom: 10,
            }}
            value={searchValue}
            onChange={handleChange}
            placeholder="Szukaj emotki"
          />
          <Box className={classes.emojis}>
            {emojis?.map((emoji, index) => (
              <EmojisPickerEmoji
                key={emoji.id}
                index={index}
                emoji={emoji}
                hoveredEmoji={hoveredEmoji}
                handleClick={handleClick}
                handleHover={handleHover}
              />
            ))}
          </Box>
        </Box>
      </Box>
      {emojis && emojis[hoveredEmoji] && (
        <EmojisPickerPreview emoji={emojis[hoveredEmoji]} />
      )}
    </Popover>
  );
};

export default EmojisPicker;
