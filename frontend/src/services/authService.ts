import { RegisterUserDTO, LoginUserDTO, AuthResponseDTO } from '../types/auth';
import { fetchWithAuth } from './api';

/**
 * Register a new user via POST /api/Auth/register
 */
export async function registerUser(payload: RegisterUserDTO): Promise<AuthResponseDTO> {
  return fetchWithAuth<AuthResponseDTO>('/Auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: payload.username.trim(),
      email: payload.email.trim(),
      password: payload.password,
    }),
  });
}

/**
 * Log in an existing user via POST /api/Auth/login
 */
export async function loginUser(payload: LoginUserDTO): Promise<AuthResponseDTO> {
  return fetchWithAuth<AuthResponseDTO>('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
    }),
  });
}
