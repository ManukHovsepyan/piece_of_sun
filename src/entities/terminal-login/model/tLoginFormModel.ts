import { createStore, createEffect } from 'effector';
import { requestOtp } from 'shared/api/loginApi';
import { confirmFx } from './effects';
import i18next from 'i18next';

interface credentials {
	username: string,
	password: string,
	rememberMe: boolean,
}

interface LoginState {
	error: null | string;
	loginData: any;
	password: string;
}

const defaultLoginState = {
	error: null,
	loginData: null,
	password: ''
}

export const $loginState = createStore<LoginState>(defaultLoginState);

export const loginFx = createEffect(async (credentials: credentials) => {
	try {
		const response = await requestOtp(credentials);
		if (response?.authId) { 
			return response	
		}
		throw new Error(i18next.t("error.invalidCredentials") as string)
	} catch (error) {
		throw new Error(i18next.t("error.invalidCredentials") as string)
	}
});

$loginState
	.on(loginFx, (state, params) => ({ ...state, error: null, loginData: null, password: params.password }))
	.on(loginFx.done, (state, { result }) => ({
		...state,
		error: null,
		loginData: result,
	}))
	.on(loginFx.fail, (state, { error }) => ({
		...state,
		error: error.message,
		loginData: null,
	}))
	.on(confirmFx.fail, () => ({
		...defaultLoginState
	}));
