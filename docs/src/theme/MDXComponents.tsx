import React from 'react';
import MDXComponentsOriginal from '@theme-original/MDXComponents';
import TryIt from '@site/src/components/TryIt';

// MDX Components available globally in docs
// Extends default components to preserve CodeBlock syntax highlighting
const MDXComponents = {
  ...MDXComponentsOriginal,
  TryIt,
};

export default MDXComponents;
