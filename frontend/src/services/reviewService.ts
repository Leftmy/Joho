import { CodeReviewRequestDTO, CodeReviewResponseDTO } from '../types/review';
import { fetchWithAuth } from './api';

export async function submitCodeReview(
  payload: CodeReviewRequestDTO,
  signal?: AbortSignal
): Promise<CodeReviewResponseDTO> {
  return fetchWithAuth<CodeReviewResponseDTO>('/Review', {
    method: 'POST',
    body: JSON.stringify({
      code: payload.code,
      language: payload.language || 'csharp',
      focusArea: payload.focusArea || 'General',
      provider: payload.provider || 'Gemini',
      model: payload.model || 'gemini-2.5-flash',
      customApiKey: payload.customApiKey ? payload.customApiKey.trim() : null,
    }),
    signal,
  });
}
