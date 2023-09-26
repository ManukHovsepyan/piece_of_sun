import { createEffect } from 'effector';
import { requestResetPasswordOtp, validateResetPasswordOtp, resetPassword } from 'shared/api/loginApi';
import { ResetActions } from 'shared/constants/flowEnum';
import i18next from 'i18next';

export const requestResetPassFx = createEffect(async (credential: { email: string }) => {
	try {
		const response = await requestResetPasswordOtp(credential);
		if (response === true) {
			return { action: ResetActions.resetValidateOtpPage, email: credential.email };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export const requestRestPassOtpFx = createEffect(async (credential: { email: string, otp: number }) => {
	try {
		const response = await validateResetPasswordOtp(credential);
		if (response === true) {
			return { action: ResetActions.resetChangePassPage };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export const resetPasswordFx = createEffect(async (credential: { email: string, password: string }) => {
	try {
		const response = await resetPassword(credential);
		if (response === true) {
			return { action: ResetActions.resetMoveLoginPage };
		}
		throw new Error(response?.description);
	} catch (error: any) {
		throw new Error(i18next.t('error.passwordReset') as string);
	}
});
