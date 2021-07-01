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
      color: theme.palette.primary['A700'],
    },
  },
}));

export default useChatMessageBodyStyles;
