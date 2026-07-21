import { useState, useCallback } from 'react';
import { CodeReviewRequestDTO, CodeReviewResponseDTO, ReviewHistoryItem } from '../types/review';
import { submitCodeReview } from '../services/reviewService';

export function useCodeReview() {
  const [currentResponse, setCurrentResponse] = useState<CodeReviewResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ReviewHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('joho_review_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const runReview = useCallback(async (payload: CodeReviewRequestDTO) => {
    if (!payload.code.trim()) {
      setError('Будь ласка, введіть код для аналізу.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await submitCodeReview(payload);
      setCurrentResponse(result);

      // Save to local history
      const newItem: ReviewHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: payload.language,
        focusArea: payload.focusArea,
        provider: String(payload.provider),
        model: payload.model,
        score: result.score,
        codeSnippet: payload.code.slice(0, 100) + (payload.code.length > 100 ? '...' : ''),
        response: result,
      };

      setHistory((prev) => {
        const updated = [newItem, ...prev.slice(0, 19)]; // Keep last 20
        try {
          localStorage.setItem('joho_review_history', JSON.stringify(updated));
        } catch {
          // Storage quota fallback
        }
        return updated;
      });
    } catch (err: any) {
      setError(err?.message || 'An error occured while reviewing!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('joho_review_history');
    } catch {
      // ignore
    }
  }, []);

  const selectHistoryItem = useCallback((item: ReviewHistoryItem) => {
    setCurrentResponse(item.response);
  }, []);

  return {
    currentResponse,
    isLoading,
    error,
    history,
    runReview,
    clearHistory,
    selectHistoryItem,
    setError,
  };
}
