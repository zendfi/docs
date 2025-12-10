import React, { useState, Children, isValidElement } from 'react';
import ApiPlayground from '../ApiPlayground';
import styles from './styles.module.css';

interface TryItProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description?: string;
  children: React.ReactNode;
}

// Extract text content from React children (handles MDX code blocks)
const extractCodeContent = (children: React.ReactNode): string => {
  let content = '';

  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      content += child;
    } else if (isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode };
      if (props.children) {
        content += extractCodeContent(props.children);
      }
    }
  });

  return content;
};

// Parse curl command or JSON from code block
const parseCodeBlock = (content: string): { method: string; body: string } => {
  const trimmed = content.trim();

  // If it's a curl command, extract method and body
  if (trimmed.startsWith('curl')) {
    // Extract method
    const methodMatch = trimmed.match(/-X\s+(GET|POST|PUT|DELETE|PATCH)/i);
    const method = methodMatch ? methodMatch[1].toUpperCase() : 'POST';

    // Extract JSON body from -d flag
    const bodyMatch = trimmed.match(/-d\s+'({[\s\S]*?})'/);
    const body = bodyMatch ? bodyMatch[1] : '{}';

    return { method, body };
  }

  // If it starts with {, assume it's JSON
  if (trimmed.startsWith('{')) {
    return { method: 'POST', body: trimmed };
  }

  return { method: 'POST', body: '{}' };
};

const TryIt: React.FC<TryItProps> = ({
  method: propMethod,
  endpoint,
  description,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract code content and parse it
  const codeContent = extractCodeContent(children);
  const parsed = parseCodeBlock(codeContent);

  // Use prop method if provided, otherwise use parsed method
  const method = propMethod || (parsed.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH');

  // Try to format the body as pretty JSON
  let formattedBody = parsed.body;
  try {
    formattedBody = JSON.stringify(JSON.parse(parsed.body), null, 2);
  } catch {
    // Keep original if not valid JSON
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.codeBlock}>
        {children}
      </div>
      <div className={styles.buttonRow}>
        <button
          className={styles.tryItButton}
          onClick={() => setIsOpen(true)}
          title="Try this request in the API Playground"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Try it</span>
        </button>
      </div>
      <ApiPlayground
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        method={method}
        endpoint={endpoint}
        defaultBody={formattedBody}
        description={description}
      />
    </div>
  );
};

export default TryIt;
