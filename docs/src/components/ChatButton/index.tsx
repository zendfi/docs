import React, { useState } from 'react';
import DocsChat from '@site/src/components/DocsChat';
import styles from './styles.module.css';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <svg 
          className={styles.sparkleIcon} 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Zm0 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12Zm4.95-9.9a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM4.17 10.77a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM16 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8ZM4 8a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8Zm9.89 4.95a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM5.23 4.17a.75.75 0 0 1-1.06 0L3.11 3.11a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Z" />
        </svg>
        <span className={styles.chatLabel}>Ask AI</span>
      </button>
      <DocsChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
