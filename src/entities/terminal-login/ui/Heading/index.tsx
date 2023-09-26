import { useTranslation } from 'react-i18next'
import { headingStyles } from './style'

export const TerminalHeading = () => {

	const {t} = useTranslation()

	return (
		<p className={headingStyles}>{t('terminalLogin.connection')}</p>
	)
}