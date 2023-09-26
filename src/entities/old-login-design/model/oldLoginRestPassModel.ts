import { createEvent, createStore } from 'effector';
import { ResetActions } from 'shared/constants/flowEnum';
import { requestResetPassFx, requestRestPassOtpFx, resetPasswordFx } from './effects/requestResetFx';

interface RestState {
  email: string;
  action: string;
  error: any;
}

const defaultLoginResetState = {
  email: "",
  action: ResetActions.resetPage,
  error: null
}

export const resetStateEv = createEvent();

export const $oldLoginResetState = createStore<RestState>(defaultLoginResetState);

$oldLoginResetState
  .on(requestResetPassFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action,
    email: params.email
  }))
  .on(requestResetPassFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: ResetActions.resetPage,
    email: ""
  }))
  .on(requestRestPassOtpFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action
  }))
  .on(requestRestPassOtpFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: ResetActions.resetPage,
    email: ""
  }))
  .on(resetPasswordFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action
  }))
  .on(resetPasswordFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: ResetActions.resetPage,
    email: ""
  }))
  .on(resetStateEv, () => ({
    email: "",
    action: ResetActions.resetPage,
    error: null
  }))
