import { createEvent, createStore } from 'effector';
import { newLoginFx, newOtpFx } from './effects/requestOtpFx';

interface LoginState {
	action: string;
  error: string | null;
  idToken: string;
  brandApp: number | null;
  credentials: Record<string, string>;
}

const defaultLoginState = {
	action: "LOGIN_PAGE",
  error: null,
  credentials: {},
  idToken: "",
  brandApp: null
}

export const resetLoginEv = createEvent();

export const $oldLoginState = createStore<LoginState>(defaultLoginState);

$oldLoginState
  .on(newLoginFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action,
    credentials: params.credentials
  }))
  .on(newLoginFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: "LOGIN_PAGE",
    credentials: {}
  }))
  .on(newOtpFx.doneData, (state, params) => ({
    ...state,
    idToken: params.id_token,
    brandApp: params.brandApp
  }))
  .on(newOtpFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: "LOGIN_PAGE",
    idToken: "",
    credentials: {},
    brandApp: null
  }))
  .on(newOtpFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: "LOGIN_PAGE",
    idToken: "",
    credentials: {},
    brandApp: null
  }))
  .on(resetLoginEv, () => (defaultLoginState))
