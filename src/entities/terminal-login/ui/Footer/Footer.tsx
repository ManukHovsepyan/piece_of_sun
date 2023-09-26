import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"

export const TerminalFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.loginFooterOuter}>
      <div className={styles.footerInner}>
        <ul className="flex justify-center my-[15px]">
          <li className={styles.footerInnerLi}>{t("terminalLogin.footerDescription")}</li>
        </ul>
      </div>
    </footer>
  )
}
