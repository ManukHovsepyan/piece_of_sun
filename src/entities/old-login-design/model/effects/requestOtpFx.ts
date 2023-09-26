import { createEffect } from 'effector';
import { requestOtpNewApi, validateOtpNewApi } from 'shared/api/loginApi';
import i18next from 'i18next';
import { Actions } from 'shared/constants/flowEnum';

export const newLoginFx = createEffect(async (credentials: Record<string, string>) => {
	try {
		const response = await requestOtpNewApi(credentials);
		if (response?.action) {
			if (response?.action === Actions.invalidCredentials) {
				throw new Error(i18next.t('error.invalidCredentials') as string);
			}
			return { action: response?.action, credentials };
		}

		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export const newOtpFx = createEffect(async (credentials: Record<string, string>) => {
	try {
		const response = await validateOtpNewApi(credentials);
		if (response?.brandApp) {
			return response;
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});