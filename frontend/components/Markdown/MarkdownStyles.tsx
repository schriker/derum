import { makeStyles, Theme } from '@material-ui/core';

const useMarkdownStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    fontSize: 16,
    fontWeight: 600,
    display: 'inline-block',
    '& strong': {
      color: theme.palette.primary['A700'],
    },
    '& hr': {
      border: `1px solid ${theme.palette.divider}`,
    },
    '& blockquote': {
      padding: '5px 25px',
      fontStyle: 'italic',
      backgroundColor: theme.palette.divider,
      borderLeft: `2px solid ${theme.palette.primary['A700']}`,
    },
    '& h1, h2, h3, h4, h5, h6': {
      margin: '10px 0',
      padding: '10px 0',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .contains-task-list': {
      padding: 0,
      listStyle: 'none',
    },
    '& .md-inline-code': {
      padding: '2px 4px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.divider,
    },
    '& a': {
      color: theme.palette.primary['A700'],
    },
    '& img': {
      display: 'inline-block',
      maxWidth: '100%',
    },
  },
}));

export default useMarkdownStyles;
