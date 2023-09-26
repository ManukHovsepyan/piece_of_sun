import Logo from 'assets/img/logo-main.png'
import { logoStyles } from './style'

export const TerminalLogo = () => {
	return (
		<img src={Logo} className={logoStyles} alt="" />
	)
}