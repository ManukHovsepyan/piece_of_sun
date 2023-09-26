import { createEvent, createStore, sample } from 'effector';
import { confirmFx, detailFx } from './effects';
import { localStorageSync, sessionStorageSync } from 'shared/helpers/storageHelper';

interface ConfirmState {
	error: null | string;
	idToken: string;
	authId: string;
	uId: string;
	isAuthenticated: boolean;
	isAssociateAuthenticated: boolean;
}

export const defaultConfirmData: ConfirmState = {
	error: null,
	idToken: '',
	authId: '',
	uId: '',
	isAuthenticated: Boolean(sessionStorageSync.privateToken),
	isAssociateAuthenticated: Boolean(localStorageSync.token)
}

export const $confirmState = createStore<ConfirmState>(defaultConfirmData);

export const $detailState = createStore<any>(null);

sample({
	clock: confirmFx.doneData,
	source: $confirmState,
	target: detailFx
})

export const setConfirmState = createEvent<Partial<ConfirmState>>()

$detailState
	.on(detailFx.doneData, (_, data) => (data))

$confirmState
	.on(confirmFx.doneData, (state, { response, authId }) => ({
		...state,
		error: null,
		idToken: response.id_token,
		authId: authId,
		isAuthenticated: true
	}))
	.on(confirmFx.fail, (state) => ({
		...state,
		error: '',
		idToken: '',
		authId: '',
	}))

