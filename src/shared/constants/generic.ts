import { localStorageSync } from "shared/helpers/storageHelper";

export const BASE_URL = process.env.REACT_APP_EXTERNAL_GATEWAY_URL ? process.env.REACT_APP_EXTERNAL_GATEWAY_URL : process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : process.env.PUBLIC_URL;
export const EXTERNAL_GATEWAY_URL_PREFIX = `/externalgateway`;
export const STORE_SECURED_URL_PREFIX = `/store-secured`;
export const GATEWAY_URL_PREFIX = `/gateway/api`;
export const BASE_API_GATEWAY = process.env.REACT_APP_EXTERNAL_GATEWAY_URL ? process.env.REACT_APP_EXTERNAL_GATEWAY_URL : (BASE_URL + EXTERNAL_GATEWAY_URL_PREFIX);
export const BASE_API_SECURED = process.env.REACT_APP_STORE_SECURED_URL ? process.env.REACT_APP_STORE_SECURED_URL : EXTERNAL_GATEWAY_URL_PREFIX;
export const USER_AUTHENTICATE_URL = BASE_API_GATEWAY + "/api/authenticate";
export const BRAND_ID = 21;
export const LANGUAGE = 'en_US';
export const LANGUAGE_SHORT = localStorageSync.language;
export const BRAND_DETAILS_URL = "/terminal/details";
export const USER_AUTHENTICATE_URL_TESTNET_LOGIN = GATEWAY_URL_PREFIX + '/associate/authenticate';
export const GRID_ID = process.env.REACT_APP_GRID_ID;
export const GRID_URL = `${BASE_URL}${EXTERNAL_GATEWAY_URL_PREFIX}/productservice/api/external/content/grid`;
