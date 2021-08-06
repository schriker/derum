import { makeStyles, Theme } from '@material-ui/core';

const useChatMessageBodyStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    lineHeight: '24px',
    '& img': {
      display: 'inline-block',
      verticalAlign: 'middle',
      margin: '0 3px',
    },
    '& a': {
      color: theme.palette.primary[300],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

export default useChatMessageBodyStyles;
