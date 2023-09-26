import i18next from 'i18next';
import EN from 'shared/translations/en/common.json'
import FR from 'shared/translations/fr/common.json'
import IT from 'shared/translations/it/common.json'
import DE from 'shared/translations/de/common.json'
import ES from 'shared/translations/es/common.json'
import { initReactI18next } from "react-i18next";
import { LANGUAGE_SHORT } from 'shared/constants/generic';

export default i18next
	.use(initReactI18next)
	.init({
		lng: LANGUAGE_SHORT,
		debug: false,
		resources: {
			en: { translation: EN },
			fr: { translation: FR },
			it: { translation: IT },
			de: { translation: DE },
			es: { translation: ES }
		},
	});