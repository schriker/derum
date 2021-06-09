import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import components from './MarkdownComponents';
import useMarkdownStyles from './MarkdownStyles';

const Markdown = ({ value }: { value: string }) => {
  const classes = useMarkdownStyles();

  return (
    <ReactMarkdown
      className={classes.wrapper}
      components={components}
      remarkPlugins={[gfm]}
    >
      {value}
    </ReactMarkdown>
  );
};

export default Markdown;
