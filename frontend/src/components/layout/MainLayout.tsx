import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileDrawer } from './MobileDrawer';
import { CodeEditor } from '../editor/CodeEditor';
import { StickySubmitBar } from '../editor/StickySubmitBar';
import { ReviewFeedback } from '../feedback/ReviewFeedback';
import { AuthModal } from '../auth/AuthModal';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useCodeReview } from '../../hooks/useCodeReview';
import { AIProvider, EffortLevel, VALID_MODELS } from '../../types/provider';
import { UserProfile } from '../../types/auth';
import { DEFAULT_CODE_SNIPPETS } from '../../utils/codeSnippets';

export const MainLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useSessionStorage<UserProfile | null>('joho_user_profile', null);
  const isAuthenticated = Boolean(user);

  // Core App State
  const [provider, setProvider] = useState<AIProvider>('Gemini');
  const [model, setModel] = useState<string>('gemini-2.5-flash');
  const [effort, setEffort] = useState<EffortLevel>('medium');
  const [language, setLanguage] = useState<string>('csharp');
  const [focusArea, setFocusArea] = useState<string>('General');
  const [code, setCode] = useState<string>(DEFAULT_CODE_SNIPPETS['csharp']);

  // Per-Provider API Keys stored in sessionStorage
  const [apiKeysMap, setApiKeysMap] = useSessionStorage<Record<string, string>>(
    'joho_provider_api_keys',
    {}
  );

  // Review execution hook
  const { currentResponse, isLoading, error, history, runReview, clearHistory, selectHistoryItem } =
    useCodeReview();

  // Switch default code snippet when language changes
  const handleLanguageChange = useCallback((newLang: string) => {
    setLanguage(newLang);
    const snippet = DEFAULT_CODE_SNIPPETS[newLang];
    if (snippet) {
      setCode(snippet);
    }
  }, []);

  // Update API key for current provider
  const handleApiKeyChange = useCallback(
    (newKey: string) => {
      setApiKeysMap((prev) => ({
        ...prev,
        [provider]: newKey,
      }));
    },
    [provider, setApiKeysMap]
  );

  // Validate model when provider changes
  useEffect(() => {
    const validForProvider = VALID_MODELS[provider] || [];
    if (!validForProvider.some((m) => m.id === model)) {
      if (validForProvider.length > 0) {
        setModel(validForProvider[0].id);
      }
    }
  }, [provider, model]);

  const currentApiKey = apiKeysMap[provider] || '';

  const handleSubmit = () => {
    runReview({
      code,
      language,
      focusArea,
      provider,
      model,
      effortLevel: effort,
      customApiKey: currentApiKey || null,
    });
  };

  const handleOpenAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header Bar with Top-Right User Profile */}
      <Header
        onOpenMobileSidebar={() => setIsMobileOpen(true)}
        user={user}
        isAuthenticated={isAuthenticated}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar
            provider={provider}
            onProviderChange={setProvider}
            model={model}
            onModelChange={setModel}
            effort={effort}
            onEffortChange={setEffort}
            apiKey={currentApiKey}
            onApiKeyChange={handleApiKeyChange}
            history={history}
            onSelectHistory={selectHistoryItem}
            onClearHistory={clearHistory}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 custom-scrollbar max-w-7xl mx-auto w-full">
          {/* Top Intro Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Code Review & Architectural Insights</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8b949e]">
              Paste your code snippet below, select language & provider options, and get instant structured review feedback.
            </p>
          </div>

          {/* Grid Layout: Code Editor & Results */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 items-start">
            {/* Left Column: Code Editor */}
            <div className="flex flex-col h-full min-h-[450px]">
              <CodeEditor
                code={code}
                onCodeChange={setCode}
                language={language}
                onLanguageChange={handleLanguageChange}
                focusArea={focusArea}
                onFocusAreaChange={setFocusArea}
              />
            </div>

            {/* Right Column: Review Results */}
            <div className="flex flex-col h-full">
              <ReviewFeedback response={currentResponse} isLoading={isLoading} />
            </div>
          </div>

          {/* Sticky Submit Bar */}
          <StickySubmitBar
            onSubmit={handleSubmit}
            isLoading={isLoading}
            disabled={!code.trim()}
            provider={provider}
            model={model}
            effort={effort}
            error={error}
          />
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        provider={provider}
        onProviderChange={setProvider}
        model={model}
        onModelChange={setModel}
        effort={effort}
        onEffortChange={setEffort}
        apiKey={currentApiKey}
        onApiKeyChange={handleApiKeyChange}
        history={history}
        onSelectHistory={(item) => {
          selectHistoryItem(item);
          setIsMobileOpen(false);
        }}
        onClearHistory={clearHistory}
      />

      {/* Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />
    </div>
  );
};
