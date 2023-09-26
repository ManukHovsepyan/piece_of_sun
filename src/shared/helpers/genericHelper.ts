import CryptoJS from 'crypto-js';
import i18next from 'i18next';
import { localStorageSync } from './storageHelper';
import {
	STORE_BASE_URL,
	PARTNER_BASE_URL,
	WHOLESALE_BASE_URL
} from 'shared/constants/genericApiRoutes';

export const callbackSkeleton = () => { }

export const getCryptoUsername = (username: string) => {
	return CryptoJS.SHA256(username).toString()
}


export const getVaultBoxLocation = (uid: string, password: string) => {
	return CryptoJS.AES.encrypt(
		uid,
		CryptoJS.enc.Hex.parse(CryptoJS.SHA256(password).toString()),
		{ iv: CryptoJS.enc.Hex.parse(password) },
	);
};

export const getLang = () => {
	return i18next.language || localStorageSync.language;
};

export const getApiPrefix = () => {
	const lang = getLang();
	return `${lang}_${lang.toUpperCase()}`;
};

export const getLangPrefix = () => {
	return `/${getLang()}`;
}

export const debounce = (fn: any, timeout: any) => {
	let timer: any;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, timeout)
	}
}

export const saveTokenInCookies = async (brandApp: number, token: string) => {
	const url = getTerminalUrlByBrandApp(brandApp);
	const loginPath = '/fr/login';

	url && setSubdomainCookie(token, url);
	window.open(url + loginPath, "_self");
}

export const setSubdomainCookie = (token: string, url: string) => {
	const expiredDate = new Date(new Date().getTime() + 1000 * 1200).getTime();
	const [domain] = process.env.NODE_ENV === "development"
		? ["localhost"]
		: (url.match(/\.[A-z]*\.[A-z]*$/g) || [""]);

	document.cookie = `privateToken=${token};expires=${expiredDate};domain=${domain};path=/`;
}

export const getTerminalUrlByBrandApp = (brandApp: number) => {
	switch (brandApp) {
		case 5:
			return STORE_BASE_URL;
		case 9:
			return WHOLESALE_BASE_URL;
		case 12:
			return PARTNER_BASE_URL;
		default:
			return null;
	}
}

export const parseJwtData = (token: string) => {
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const data = JSON.parse(atob(base64));

		return {
			exp: data.exp * 1000,
			token
		}
	} catch (error) {
		return null;
	}
}

export const checkIsIframeVisible = (menuId: number) => {
	const currentTokenData = localStorageSync.pageTokens[menuId] || {};

	return currentTokenData.exp > new Date().getTime();
}

export const stripHTMLreg = /(<([^>]+)>)/ig;


export const getDataBySectionAndWidget = (section: any, widget: any, data = [], type = "", name = "") => {
	let items: any = {};
	if (name === "") {
		items = data.length && data.find((item: any) => type ? item.section === section && item.widget === widget && item.type.toUpperCase() === type : item.section === section && item.widget === widget);
	} else {
		items = data.length && data.find((item: any) => {
			if (type && item.name) {
				return item.section === section && item.widget === widget && item.type.toUpperCase() === type && item.name.toUpperCase() === name.toUpperCase();
			}

			if (item.name) {
				return item.section === section && item.widget === widget && item.name.toUpperCase() === name.toUpperCase();
			}

			return item.section === section && item.widget === widget
		});
	}

	return items || {};
};