import OldLoginWrapper from "shared/ui/OldLoginWrapper/OldLoginWrapper";
import OldLoginButton from "shared/ui/OldLoginButton/OldLoginButton";
import OldLoginInput from "shared/ui/OldLoginInput/OldLoginInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import styles from './styles/old-login-form.module.scss'

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error?: string
}

const OldLoginOtpForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [otpCode, setOtpCode] = useState<number | string>("")
  const { t } = useTranslation();

  const onFormChange = ({ target }: any) => {
    const { value } = target;

    setOtpCode(value)
  }

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper>
        {error && (
          <span className={styles.error}>{error}</span>
        )}
        <OldLoginInput
          name="otpCode"
          placeholder={t('placeholders.otp') as string}
          value={otpCode}
          onChange={onFormChange}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <OldLoginButton
          onClick={() => onSubmit(otpCode)}
          loading={isLoading}
        >
          {t('terminalLogin.submit')}
        </OldLoginButton>
      </OldLoginWrapper>
    </div>
  )
}
export default OldLoginOtpForm;