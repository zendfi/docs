import React, { useState, useRef, useEffect } from 'react';
import DocsChat from '@site/src/components/DocsChat';
import styles from './styles.module.css';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsOpen(true);
    }
  };

  const handleBarClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <div 
        className={`${styles.chatBar} ${isExpanded ? styles.expanded : ''}`}
        onClick={handleBarClick}
      >
        <div className={styles.chatBarInner}>
          <svg 
            className={styles.sparkleIcon} 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z" />
          </svg>
          {isExpanded ? (
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <input
                ref={inputRef}
                type="text"
                className={styles.chatInput}
                placeholder="Ask AI about the docs..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleBlur}
              />
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={!inputValue.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          ) : (
            <span className={styles.chatLabel}>Ask AI about the docs...</span>
          )}
        </div>
      </div>
      <DocsChat 
        isOpen={isOpen} 
        onClose={() => {
          setIsOpen(false);
          setInputValue('');
          setIsExpanded(false);
        }} 
        initialMessage={inputValue}
      />
    </>
  );
}
