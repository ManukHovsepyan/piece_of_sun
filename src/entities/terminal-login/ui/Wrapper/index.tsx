import { loginInner, wrapperStyles } from "./style"
import waveumlogo from 'assets/img/logo-main.png';
import { Link } from "react-router-dom"
import { getLangPrefix } from "shared/helpers/genericHelper"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"

export const TerminalLoginWrapper: React.FC<any> = ({children, maxWidth}) => {
  const { t } = useTranslation();
  
  return (
    <div className={wrapperStyles}>
      <div className={loginInner}>
        <Link to={getLangPrefix()} className={styles.waveumLogo}>
          <img className={styles.waveumLogoImg} src={waveumlogo} alt="" />
        </Link>
        <p className={styles.formTitle}>{t("terminalLogin.formHeading")}</p>
        {children}
      </div>
    </div>
  )
}
