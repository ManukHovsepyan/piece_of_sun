import { createEvent, createStore } from 'effector';
import { RegisterActions } from 'shared/constants/flowEnum';
import { requestRegistrationOtpFx, validateRegistrationOtpFx, requestRegisterFx } from './effects/requestRegister';

interface RegisterState {
  email: string;
  action: string;
  error: any;
}

const defaultRegisterState = {
  email: "",
  action: RegisterActions.registerPage,
  error: null
}

export const resetRegisterStateEv = createEvent();

export const $oldLoginRegisterState = createStore<RegisterState>(defaultRegisterState);

$oldLoginRegisterState
  .on(requestRegistrationOtpFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action,
    email: params.email
  }))
  .on(requestRegistrationOtpFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: RegisterActions.registerPage,
    email: ""
  }))
  .on(validateRegistrationOtpFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action
  }))
  .on(validateRegistrationOtpFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: RegisterActions.registerPage,
    email: ""
  }))
  .on(requestRegisterFx.doneData, (state, params) => ({
    ...state,
    error: null,
    action: params.action
  }))
  .on(requestRegisterFx.fail, (state, { error }) => ({
    ...state,
    error: error.message,
    action: RegisterActions.registerPage,
    email: ""
  }))
  .on(resetRegisterStateEv, () => (defaultRegisterState))
