import { createEffect } from "effector";
import { ApiError } from "exceptions";
import { confirmOtp, terminalDetail } from "shared/api/loginApi";
import { sessionStorageSync } from "shared/helpers/storageHelper";

interface Credentials {
	body: any,
	authId: string,
}

export const confirmFx = createEffect(async ({ body, authId }: Credentials) => {
	try {
		const response = await confirmOtp(body, authId);
		if (response.id_token) {
			sessionStorageSync.privateToken = response.id_token;
			return { response, authId };
		}

		throw ApiError.UnauthorizedError()
	} catch (error) {
		throw ApiError.UnauthorizedError()
	}
});

export const detailFx = createEffect(async () => {
	try {
		const response = await terminalDetail();
		
		return response;
	} catch (error) {
		return null
	}
});
