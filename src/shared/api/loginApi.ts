import { BaseApi } from 'shared/api/base'
import { GRID_ID, GRID_URL } from 'shared/constants/generic';
import { getLang } from 'shared/helpers/genericHelper';

export const requestOtp = (body: any) => {
  const http = new BaseApi('/api');
  return http.post(`/request-otp?cacheBuster=${+new Date()}`, body);
}

export const confirmOtp = (body: any, authId: string) => {
  const http = new BaseApi('/api');
  return http.post(`/submit-otp?cacheBuster=${+new Date()}`, body, http.buildHeaders(authId));
}

export const terminalDetail = () => {
  const http = new BaseApi('/api');
  return http.get(`/terminal/details`);
}

export const fetchGrids = (id: number | null = null) => {
  const http = new BaseApi('', `${GRID_URL}/${id || GRID_ID}`, { "Content-Type": "application/json", language: getLang() });
  return http.get();
}

export const requestOtpNewApi = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/request-login-otp', body);
}

export const validateOtpNewApi = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/validate-login-otp', body);
}

//reset password api
export const requestResetPasswordOtp = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/request-reset-password-otp', body);
}

export const validateResetPasswordOtp = (body: Record<string, string | number>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/validate-reset-password-otp', body);
}

export const resetPassword = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/reset-password', body);
}

// registration api
export const requestRegistrationOtp = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/request-registration-otp', body);
}

export const validateRegistrationOtp = (body: Record<string, string | number>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/validate-registration-otp', body);
}

export const requestRegister = (body: Record<string, string>) => {
  const http = new BaseApi('/api');
  return http.post('/user/auth/register', body);
}