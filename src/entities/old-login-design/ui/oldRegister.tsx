import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "effector-react";
import { $menuPaths } from "entities/menu/model/menu";
import OldLoginWrapper from "shared/ui/OldLoginWrapper/OldLoginWrapper";
import OldLoginButton from "shared/ui/OldLoginButton/OldLoginButton";
import OldLoginInput from "shared/ui/OldLoginInput/OldLoginInput";
import styles from './styles/old-login-form.module.scss'

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error?: string
}

const OldRegister: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [email, setEmail] = useState<string>("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const menuPaths = useStore($menuPaths);

  const onFormChange = ({ target }: any) => {
    const { value } = target;

    setEmail(value)
  }

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper text={t("terminalLogin.registerFormHeading") as string} >
        {error && (
          <span className={styles.error}>{error}</span>
        )}
        <OldLoginInput
          name="email"
          placeholder={t('placeholders.register') as string}
          value={email}
          onChange={onFormChange}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <OldLoginButton
          onClick={() => onSubmit(email)}
          loading={isLoading}
        >
          {t('terminalLogin.signUp')}
        </OldLoginButton>
        <div
          className="text-[#889aab] cursor-pointer"
          onClick={() => navigate(menuPaths.home.path)}
        >{t('terminalLogin.alreadyHaveAccount')}</div>
      </OldLoginWrapper>
    </div>
  )
}
export default OldRegister;
