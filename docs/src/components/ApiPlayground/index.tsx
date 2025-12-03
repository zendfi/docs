import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

interface ApiPlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  defaultBody?: string;
  description?: string;
}

interface ApiKeyInfo {
  key: string;
  environment: 'live' | 'test' | 'unknown';
}

const ApiPlayground: React.FC<ApiPlaygroundProps> = ({
  isOpen,
  onClose,
  method,
  endpoint,
  defaultBody = '{}',
  description,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInfo, setApiKeyInfo] = useState<ApiKeyInfo | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [requestBody, setRequestBody] = useState(defaultBody);
  const [response, setResponse] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');

  const BASE_URL = 'https://api.zendfi.tech';

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('zendfi_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      detectEnvironment(savedKey);
    }
  }, []);

  // Reset body when defaultBody changes
  useEffect(() => {
    setRequestBody(defaultBody);
  }, [defaultBody]);

  const detectEnvironment = (key: string): ApiKeyInfo => {
    let environment: 'live' | 'test' | 'unknown' = 'unknown';
    if (key.startsWith('zfi_live_')) {
      environment = 'live';
    } else if (key.startsWith('zfi_test_')) {
      environment = 'test';
    }
    const info = { key, environment };
    setApiKeyInfo(info);
    return info;
  };

  const saveApiKey = () => {
    localStorage.setItem('zendfi_api_key', apiKey);
    detectEnvironment(apiKey);
    setShowApiKeyInput(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('zendfi_api_key');
    setApiKey('');
    setApiKeyInfo(null);
  };

  const formatJson = (json: string): string => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      return json;
    }
  };

  const executeRequest = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);
    setResponseStatus(null);
    setActiveTab('response');

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      };

      if (method !== 'GET' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      setResponseStatus(res.status);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateCurl = (): string => {
    let curl = `curl -X ${method} "${BASE_URL}${endpoint}"`;
    curl += ` \\\n  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}"`;
    curl += ` \\\n  -H "Content-Type: application/json"`;
    if (method !== 'GET' && requestBody && requestBody !== '{}') {
      curl += ` \\\n  -d '${requestBody}'`;
    }
    return curl;
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return styles.statusSuccess;
    if (status >= 400 && status < 500) return styles.statusClientError;
    if (status >= 500) return styles.statusServerError;
    return '';
  };

  const getMethodColor = (m: string) => {
    switch (m) {
      case 'GET': return styles.methodGet;
      case 'POST': return styles.methodPost;
      case 'PUT': return styles.methodPut;
      case 'DELETE': return styles.methodDelete;
      case 'PATCH': return styles.methodPatch;
      default: return '';
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.playground} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h3 className={styles.title}>API Playground</h3>
            {apiKeyInfo && (
              <span className={`${styles.envBadge} ${apiKeyInfo.environment === 'live' ? styles.envLive : styles.envTest}`}>
                {apiKeyInfo.environment === 'live' ? '🔴 Mainnet' : '🟢 Devnet'}
              </span>
            )}
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Live Warning */}
        {apiKeyInfo?.environment === 'live' && (
          <div className={styles.liveWarning}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>You're using a <strong>live API key</strong>. Requests will execute real transactions on mainnet.</span>
          </div>
        )}

        {/* API Key Section */}
        <div className={styles.apiKeySection}>
          {showApiKeyInput || !apiKey ? (
            <div className={styles.apiKeyInput}>
              <input
                type="password"
                placeholder="Enter your API key (zfi_test_... or zfi_live_...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={styles.input}
              />
              <button onClick={saveApiKey} className={styles.saveButton}>
                Save Key
              </button>
            </div>
          ) : (
            <div className={styles.apiKeyDisplay}>
              <span className={styles.apiKeyMasked}>
                {apiKey.substring(0, 12)}...{apiKey.substring(apiKey.length - 4)}
              </span>
              <button onClick={() => setShowApiKeyInput(true)} className={styles.linkButton}>
                Change
              </button>
              <button onClick={clearApiKey} className={styles.linkButton}>
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Endpoint Display */}
        <div className={styles.endpointSection}>
          <span className={`${styles.method} ${getMethodColor(method)}`}>{method}</span>
          <code className={styles.endpoint}>{BASE_URL}{endpoint}</code>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'request' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('request')}
          >
            Request
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'response' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('response')}
          >
            Response
            {responseStatus && (
              <span className={`${styles.statusBadge} ${getStatusColor(responseStatus)}`}>
                {responseStatus}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'request' && (
            <div className={styles.requestPanel}>
              {method !== 'GET' && (
                <>
                  <div className={styles.editorHeader}>
                    <span>Request Body</span>
                    <button
                      onClick={() => setRequestBody(formatJson(requestBody))}
                      className={styles.formatButton}
                    >
                      Format
                    </button>
                  </div>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className={styles.editor}
                    spellCheck={false}
                  />
                </>
              )}
              {method === 'GET' && (
                <div className={styles.noBody}>
                  <span>GET requests don't have a request body</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'response' && (
            <div className={styles.responsePanel}>
              {isLoading && (
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                  <span>Executing request...</span>
                </div>
              )}
              {error && (
                <div className={styles.error}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              {response && !isLoading && (
                <>
                  <div className={styles.editorHeader}>
                    <span>
                      Response
                      {responseStatus && (
                        <span className={`${styles.statusInline} ${getStatusColor(responseStatus)}`}>
                          {responseStatus}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => copyToClipboard(response)}
                      className={styles.copyButton}
                    >
                      Copy
                    </button>
                  </div>
                  <pre className={styles.responseCode}>{response}</pre>
                </>
              )}
              {!response && !isLoading && !error && (
                <div className={styles.noResponse}>
                  <span>Click "Execute" to send the request</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            onClick={() => copyToClipboard(generateCurl())}
            className={styles.curlButton}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy cURL
          </button>
          <button
            onClick={executeRequest}
            disabled={isLoading}
            className={styles.executeButton}
          >
            {isLoading ? (
              <>
                <div className={styles.spinnerSmall} />
                Executing...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Execute
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;
