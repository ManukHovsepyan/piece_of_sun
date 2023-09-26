import { createStore, createEffect, createEvent } from 'effector';
import { ApiError } from 'exceptions';
// import { login } from 'shared/api/loginApi';

interface MenuState {
	loginData: any;
	error: any;
}

export const $loginState = createStore<MenuState>({
	loginData: [],
	error: '',
});

export const LoginFx = createEffect(async (body: any) => {
	try {
		// const result = await login(body)
        // if (result) return result
		throw ApiError.UnauthorizedError()
	} catch (error) {
		throw ApiError.UnauthorizedError()
	}
});

$loginState
	.on(LoginFx.done, (state, { result }) => ({
		...state,
		error: null,
		loginData: result
	}))
	.on(LoginFx.fail, (state, { error }) => ({
		...state,
		error: error.message,
		loginData: null,
	}));
