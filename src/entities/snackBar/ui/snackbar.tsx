import styles from "./styles/snackbar.module.scss"

export const Snackbar: React.FC<any> = ({ children }) => {

  return (
    <div className={styles.snackbarContainer}>
      <div> <span id="closeSnackbar">&#x2715;</span></div>
      <div className={styles.textContainer}>
        {children}
      </div>
      <div
        id="snackbarProgress"
        className={styles.progressBar}
      ></div>
    </div>
  )
}