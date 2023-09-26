import { createEffect } from 'effector';
import { requestRegistrationOtp, validateRegistrationOtp, requestRegister } from 'shared/api/loginApi';
import { RegisterActions } from 'shared/constants/flowEnum';
import i18next from 'i18next';

export const requestRegistrationOtpFx = createEffect(async (credential: { email: string }) => {
	try {
		const response = await requestRegistrationOtp(credential);
		if (response === true) {
			return { action: RegisterActions.validateRegisterPage, email: credential.email };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export const validateRegistrationOtpFx = createEffect(async (credential: { email: string, otp: number }) => {
	try {
		const response = await validateRegistrationOtp(credential);
		if (response === true) {
			return { action: RegisterActions.requestRegisterPage };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export const requestRegisterFx = createEffect(async (credential: { email: string, password: string }) => {
	try {
		const response = await requestRegister(credential);
		if (response === true) {
			return { action: RegisterActions.registerSuccessPage };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(i18next.t('error.registrationFailed') as string);
	}
});
