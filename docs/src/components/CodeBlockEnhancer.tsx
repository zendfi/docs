import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

function generateGitHubIssueUrl(code: string, language: string, pageUrl: string): string {
  const baseUrl = 'https://github.com/zendfi/zendfi-toolkit/issues/new';
  const title = encodeURIComponent('Documentation: Incorrect code example');
  const codeSnippet = code.slice(0, 500);
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

function addReportButtons() {
  // Find all code blocks that don't already have a report button
  const codeBlocks = document.querySelectorAll('pre:not([data-has-report-btn])');
  
  codeBlocks.forEach((pre) => {
    // Mark as processed
    pre.setAttribute('data-has-report-btn', 'true');
    
    // Get the code content
    const code = pre.querySelector('code');
    if (!code) return;
    
    const codeText = code.textContent || '';
    
    // Skip inline code (single line without newlines)
    if (!codeText.includes('\n') && codeText.length < 100) return;
    
    // Get language from class
    const languageClass = Array.from(code.classList).find(c => c.startsWith('language-'));
    const language = languageClass?.replace('language-', '') || '';
    
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; margin: 1rem 0;';
    
    // Wrap the pre element
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    // Apply rounded corners to pre
    (pre as HTMLElement).style.borderRadius = '12px';
    (pre as HTMLElement).style.overflow = 'hidden';
    
    // Create report button
    const button = document.createElement('button');
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
      <span>Report incorrect code</span>
    `;
    button.style.cssText = `
      display: inline-flex;
      align-items: center;
      margin-top: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--ifm-font-color-secondary, #64748b);
      background: transparent;
      border: 1px solid var(--ifm-color-emphasis-200, #e5e7eb);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: var(--ifm-font-family-base, sans-serif);
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.color = 'var(--ifm-color-primary, #635bff)';
      button.style.borderColor = 'var(--ifm-color-primary, #635bff)';
      button.style.background = 'rgba(99, 91, 255, 0.05)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.color = 'var(--ifm-font-color-secondary, #64748b)';
      button.style.borderColor = 'var(--ifm-color-emphasis-200, #e5e7eb)';
      button.style.background = 'transparent';
    });
    
    button.addEventListener('click', () => {
      const url = generateGitHubIssueUrl(codeText, language, window.location.href);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    
    wrapper.appendChild(button);
  });
}

export default function CodeBlockEnhancer(): null {
  const location = useLocation();
  
  useEffect(() => {
    // Run after a short delay to ensure the page is fully rendered
    const timer = setTimeout(addReportButtons, 100);
    
    // Also run on DOM mutations (for dynamic content)
    const observer = new MutationObserver(() => {
      addReportButtons();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
  
  return null;
}
