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
        <span className={styles.chatIcon}>💬</span>
        <span className={styles.chatLabel}>Ask AI</span>
      </button>
      <DocsChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
