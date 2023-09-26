import waveumlogo from 'assets/img/waveum_main_logo.png';
import { useTranslation } from 'react-i18next';
import styles from "./styles/old-login-wrapper.module.scss";

interface Props {
  text?: string;
  children: React.ReactNode
}

const OldLoginWrapper: React.FC<Props> = ({
  children,
  text = ''
}) => {
  const { t } = useTranslation();
	return (
		<div
      className={styles.oldLoginWrapper}
    >
      <div className={styles.content}>
        <div className={styles.title}>
          <img src={waveumlogo} alt="waveum logo" />
          <span>{text || t("terminalLogin.formHeading")}</span>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
	);
};

export default OldLoginWrapper;