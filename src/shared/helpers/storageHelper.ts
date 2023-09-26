type StorageOption = {
  name: string,
  default: any,
  isJson: boolean;
  modifier?: (data: any) => any
}

export const getLangFromUrl = () => {
	const matched = window.location.pathname.match(/^\/([A-z]{2})/);
	return matched && Array.isArray(matched) && matched[1] ? matched[1] : 'en';
};

const localStorageValues: StorageOption[] = [{
  name: "basket",
  default: {},
  isJson: true
},{
  name: "token",
  default: '',
  isJson: false
},{
  name: "language",
  default: getLangFromUrl(),
  isJson: false
},{
  name: "getForm",
  default: {},
  isJson: true
},{
  name: "rememberMe",
  default: 0,
  isJson: false,
  modifier: (data) => Boolean(+data)
},{
  name: "pageTokens",
  default: {},
  isJson: true
}];

const sessionStorageValues: StorageOption[] = [{
  name: "terminalOpen",
  default: '',
  isJson: false
},{
  name: "storeCode",
  default: '',
  isJson: false
},{
  name: "privateToken",
  default: '',
  isJson: false
},{
  name: "terminalCode",
  default: '',
  isJson: false
},{
  name: "privateKey",
  default: '',
  isJson: false
}]

enum StorageType {
  local = "local",
  session = "session"
}

class LocalStorageSyncBuilder {
  constructor() {
    this.defineSyncProperties(localStorageValues, StorageType.local);
    this.defineSyncProperties(sessionStorageValues, StorageType.session);
  }
  public localStorageSync: Record<string, any> = {}
  public sessionStorageSync: Record<string, any> = {}

  private defineSyncProperties(listOptions: StorageOption[], type: StorageType) {
    const storageObject = this.getStorage(type);
    for(let value of listOptions) {
      Object.defineProperty(type === StorageType.local ? this.localStorageSync : this.sessionStorageSync, value.name, {
        get() {
          try {
            if (value.name === 'language') return value.default;

            const storageData = storageObject.getItem(value.name) || value.default;

            if (!value.isJson) return value.modifier ? value.modifier(storageData) : storageData;

            const result = storageData ? JSON.parse(storageData) : storageData;

            return value.modifier ? value.modifier(result) : result;
          } catch (error) {
            return value.default;
          }
        },
        set(fieldValue) {
          storageObject.setItem(
            value.name,
            value.isJson ? JSON.stringify(fieldValue) : fieldValue
          )
        }
      })
    }
  }

  private getStorage(type: StorageType) {
    switch(type) {
      case StorageType.local:
        return localStorage
      case StorageType.session:
        return sessionStorage
    }
  }
}

export const { localStorageSync, sessionStorageSync } = new LocalStorageSyncBuilder();