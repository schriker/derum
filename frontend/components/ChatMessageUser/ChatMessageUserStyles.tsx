import { makeStyles, Theme } from '@material-ui/core';
import { ChatMessageUserStylesPropsType } from '../../types/messages';

const useChatMessageUserStyles = makeStyles<
  Theme,
  ChatMessageUserStylesPropsType
>((theme: Theme) => ({
  wrapper: (props) => ({
    wordBreak: 'normal',
    borderRadius: theme.shape.borderRadius,
    color: props.isCurrentUser
      ? theme.palette.background.default
      : theme.palette.text.primary,
    backgroundColor: props.isCurrentUser
      ? theme.palette.common.white
      : theme.palette.grey[800],
    padding: '1px 5px',
    margin: '0 2px',
  }),
}));

export default useChatMessageUserStyles;
