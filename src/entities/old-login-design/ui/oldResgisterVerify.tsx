import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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

const OldRegisterVerify: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [otp, setOtp] = useState<string>("")
  const { t } = useTranslation();

  const onFormChange = ({ target }: any) => {
    const { value } = target;

    setOtp(value)
  }

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper text={t("terminalLogin.registerFormHeading") as string} >
        {error && (
          <span className={styles.error}>{error}</span>
        )}
        <OldLoginInput
          name="otp"
          placeholder={t('placeholders.registerVerify') as string}
          value={otp}
          onChange={onFormChange}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <OldLoginButton
          onClick={() => onSubmit(+otp)}
          loading={isLoading}
        >
          {t('terminalLogin.submit')}
        </OldLoginButton>
      </OldLoginWrapper>
    </div>
  )
}
export default OldRegisterVerify;
