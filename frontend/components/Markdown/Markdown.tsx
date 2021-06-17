import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import gfm from 'remark-gfm';
import components from './MarkdownComponents';
import useMarkdownStyles from './MarkdownStyles';

const Markdown = (props: ReactMarkdownOptions): JSX.Element => {
  const classes = useMarkdownStyles();

  return (
    <ReactMarkdown
      className={classes.wrapper}
      components={components}
      remarkPlugins={[gfm]}
      {...props}
    >
      {props.children}
    </ReactMarkdown>
  );
};

export default Markdown;
