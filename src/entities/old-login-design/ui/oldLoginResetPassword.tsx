/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import OldLoginWrapper from "shared/ui/OldLoginWrapper/OldLoginWrapper";
import OldLoginButton from "shared/ui/OldLoginButton/OldLoginButton";
import OldLoginInput from "shared/ui/OldLoginInput/OldLoginInput";
import styles from './styles/old-login-form.module.scss'

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error?: string
}

const OldLoginResetPass: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [password, setPassword] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<string>('');
  const { t } = useTranslation();

  const onFormChange = ({ target }: any) => {
    const { name, value } = target;

    setPassword({
      ...password,
      [name]: value
    })
  }

  const checkPasswords = () => {
    if (password.password !== password.passwordConfirme) {
      setPasswordError(t('error.passwordMismatch') || '');
      return;
    }

    setPasswordError('');
    onSubmit(password.password)
  }

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper text={t("terminalLogin.resetFormHeading", { step: "password" }) as string} >
        {error || passwordError && (
          <span className={styles.error}>{error || passwordError}</span>
        )}
        <OldLoginInput
          name="password"
          placeholder={t('placeholders.registerRequest') as string}
          value={password.password || ''}
          onChange={onFormChange}
          type="password"
          isWithEye={true}
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <OldLoginInput
          name="passwordConfirme"
          placeholder={t('placeholders.registerConfirme') as string}
          value={password.passwordConfirme || ''}
          onChange={onFormChange}
          type="password"
          isWithEye={true}
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <OldLoginButton
          onClick={checkPasswords}
          loading={isLoading}
        >
          {t('terminalLogin.submit')}
        </OldLoginButton>
      </OldLoginWrapper>
    </div>
  )
}
export default OldLoginResetPass;
