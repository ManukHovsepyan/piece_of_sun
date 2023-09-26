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

const OldLoginPasswordRest: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [email, setEmail] = useState<string>("")
  const { t } = useTranslation();

  const onFormChange = ({ target }: any) => {
    const { value } = target;

    setEmail(value)
  }

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper text={t("terminalLogin.resetFormHeading", { step: "email" }) as string} >
        {error && (
          <span className={styles.error}>{error}</span>
        )}
        <OldLoginInput
          name="email"
          placeholder={t('placeholders.reset') as string}
          value={email}
          onChange={onFormChange}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <OldLoginButton
          onClick={() => onSubmit(email)}
          loading={isLoading}
        >
          {t('terminalLogin.submit')}
        </OldLoginButton>
      </OldLoginWrapper>
    </div>
  )
}
export default OldLoginPasswordRest;