import { BaseApi } from 'shared/api/base'
import { BRAND_ID } from 'shared/constants/generic';
import { getApiPrefix } from 'shared/helpers/genericHelper';

const http = new BaseApi();

export const getMenu = () => {
	return http.get(
		'/externalgateway/productservice/api/external/menu',
		{ Language: getApiPrefix(), Brand: BRAND_ID }
	);
}