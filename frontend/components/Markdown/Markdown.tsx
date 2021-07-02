import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import gfm from 'remark-gfm';
import components from './MarkdownComponents';
import useMarkdownStyles from './MarkdownStyles';

const Markdown = ({
  isComment = false,
  ...rest
}: ReactMarkdownOptions & { isComment?: boolean }): JSX.Element => {
  const classes = useMarkdownStyles({
    isComment,
  });

  return (
    <ReactMarkdown
      className={classes.wrapper}
      components={components}
      remarkPlugins={[gfm]}
      {...rest}
    >
      {rest.children}
    </ReactMarkdown>
  );
};

export default Markdown;
