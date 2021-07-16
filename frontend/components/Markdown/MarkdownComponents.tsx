/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import { Typography } from '@material-ui/core';

const components: Partial<NormalComponents & SpecialComponents> = {
  h1({ children, ...props }) {
    return (
      <Typography variant="h1" {...props}>
        {children}
      </Typography>
    );
  },
  h2({ children, ...props }) {
    return (
      <Typography variant="h2" {...props}>
        {children}
      </Typography>
    );
  },
  h3({ children, ...props }) {
    return (
      <Typography variant="h3" {...props}>
        {children}
      </Typography>
    );
  },
  h4({ children, ...props }) {
    return (
      <Typography variant="h4" {...props}>
        {children}
      </Typography>
    );
  },
  h5({ children, ...props }) {
    return (
      <Typography variant="h5" {...props}>
        {children}
      </Typography>
    );
  },
  h6({ children, ...props }) {
    return (
      <Typography variant="h6" {...props}>
        {children}
      </Typography>
    );
  },
  a({ children, ...props }) {
    return (
      <a {...props} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
  img(props) {
    return (
      <span style={{ display: 'block', textAlign: 'center' }}>
        <a href={props.src as string} rel="noreferrer" target="_blank">
          <img {...props} />
        </a>
      </span>
    );
  },
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        wrapLongLines
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="md-inline-code" {...props}>
        {children}
      </code>
    );
  },
};

export default components;
