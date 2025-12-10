import React, {type ReactNode, isValidElement} from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type {WrapperProps} from '@docusaurus/types';
import styles from './styles.module.css';

type Props = WrapperProps<typeof CodeBlockType>;

function getCodeString(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (isValidElement(children)) {
    const childProps = children.props as { children?: ReactNode };
    if (typeof childProps.children === 'string') {
      return childProps.children;
    }
  }
  return '';
}

function generateGitHubIssueUrl(code: string, language?: string): string {
  const baseUrl = 'https://github.com/zendfi/zendfi-toolkit/issues/new';
  const title = encodeURIComponent('Documentation: Incorrect code example');
  const codeSnippet = code.slice(0, 500);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '[Page URL]';
  const body = encodeURIComponent(
`## Issue Description
Please describe what is incorrect about this code example:

## Code Snippet
\`\`\`${language || ''}
${codeSnippet}${code.length > 500 ? '\n... (truncated)' : ''}
\`\`\`

## Page URL
${pageUrl}

## Expected Behavior
What should the code do instead?
`
  );
  
  return `${baseUrl}?title=${title}&body=${body}&labels=documentation,bug`;
}

export default function CodeBlockWrapper(props: Props): ReactNode {
  const {children, language} = props;
  const codeString = getCodeString(children);

  const handleReportClick = () => {
    const url = generateGitHubIssueUrl(codeString, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <CodeBlock {...props} />
      <button
        className={styles.reportButton}
        onClick={handleReportClick}
        type="button"
        title="Report incorrect code"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        <span>Report incorrect code</span>
      </button>
    </div>
  );
}
