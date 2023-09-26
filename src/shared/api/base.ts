import { AUTH_BASE_URL } from "shared/constants/genericApiRoutes";
import { localStorageSync, sessionStorageSync } from "shared/helpers/storageHelper";

export class BaseApi {
  private baseApi: string = '';
  private storeToken: string = sessionStorageSync.privateToken;
  private assocaiteToken: string = localStorageSync.privateToken;
  private additionalHeaders: any | null = null;

  constructor(
    private apiPrefix: string = '',
    private baseUrl: string = AUTH_BASE_URL || '',
    private headers: any = null
  ) {
    this.baseApi = this.baseUrl + this.apiPrefix || '';
  }
  private getAuthHeader() {
    return this.headers || this.buildHeaders(this.storeToken, this.assocaiteToken);
  }

  public setAdditionalHeaders(headers: any) {
    this.additionalHeaders = headers;
  }

  public buildHeaders(authToken: string = '', assocaiteToken: string = '') {
    return {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}`}),
      ...(assocaiteToken && {'Associate-Authorization': `${assocaiteToken}`}),
      ...(this.additionalHeaders)
    }
  }

  private getUrl(url: string) {
    return `${this.baseApi}${url}`
  }

  private handleResponse(res: Response) {
    return res.json()
  }

  public get(
    url: string = '',
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      headers,
    })
      .then(this.handleResponse)
  }

  public post(url: string,
    payload: any = {},
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      method: "POST",
      headers,
      redirect: "follow",
      cache: "no-cache",
      body: JSON.stringify(payload)
    }).then(this.handleResponse)
  }

  public put(url: string,
    payload: any,
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      method: "PUT",
      headers,
      redirect: "follow",
      cache: "no-cache",
      body: JSON.stringify(payload)
    }).then(this.handleResponse)
  }

  public delete(url: string,
    headers: any = this.getAuthHeader()
  ): Promise<any> {
    return fetch(this.getUrl(url), {
      headers,
    })
      .then(this.handleResponse)
  }
}