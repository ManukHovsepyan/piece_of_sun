import logo from "assets/img/waveum_white_logo1.png"
import styles from "./style.module.scss"

export const TerminalHeader = () => {
  return (
    <div className={styles.loginHeader}>
      <a href="https://www.waveum.com" >
        <img src={logo} className={styles.headLogo} alt="head-logo" />
      </a>
    </div>
  )
}
