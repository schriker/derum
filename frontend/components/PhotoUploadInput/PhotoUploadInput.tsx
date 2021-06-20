import { Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import usePhotoUploadStyles from './PhotoUploadStyles';

const PhotoUploadInput = React.forwardRef<
  HTMLInputElement,
  {
    clear: () => void;
    error: DeepMap<File, FieldError>;
    inputProps: React.HTMLProps<HTMLInputElement>;
  }
>((props, ref) => {
  const classes = usePhotoUploadStyles();
  const [fileName, setFileName] = useState<string | null>(null);
  const { clear, error, inputProps } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files[0].name);
    inputProps.onChange(e);
  };

  const handleReset = () => {
    clear();
    setFileName(null);
  };

  return (
    <div className={classes.root}>
      <input
        ref={ref}
        {...inputProps}
        onChange={handleChange}
        className={classes.input}
      />
      <label htmlFor={inputProps.id} className={classes.label}>
        <ButtonDefault component="span">Dodaj miniaturkę</ButtonDefault>
        <Typography
          className={classes.name}
          color="textSecondary"
          variant="body1"
        >
          {fileName}
        </Typography>
        {fileName && (
          <ButtonIcon
            color="secondary"
            size="small"
            aria-label="close"
            onClick={handleReset}
          >
            <CloseIcon style={{ fontSize: 22 }} />
          </ButtonIcon>
        )}
      </label>
      {error && (
        <Typography variant="subtitle1" color="error">
          Maksymalny rozmiar pliku to 5MB
        </Typography>
      )}
    </div>
  );
});

PhotoUploadInput.displayName = 'PhotoUploadInput';

export default PhotoUploadInput;
