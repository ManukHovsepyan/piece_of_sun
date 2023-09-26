import OldLoginWrapper from "shared/ui/OldLoginWrapper/OldLoginWrapper";
import OldLoginButton from "shared/ui/OldLoginButton/OldLoginButton";
import OldLoginInput from "shared/ui/OldLoginInput/OldLoginInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetStateEv } from "../model/oldLoginRestPassModel";
import { resetRegisterStateEv } from "../model/oldRegister";
import { localStorageSync } from "shared/helpers/storageHelper";
import { useStore } from "effector-react";
import { $menuPaths } from "entities/menu/model/menu";
import styles from './styles/old-login-form.module.scss'

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  error?: string
}

const OldLoginForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  error
}) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    rememberMe: boolean;
  }>({
    username: "",
    password: "",
    rememberMe: localStorageSync.rememberMe
  })
  const { t } = useTranslation();
  const navigate = useNavigate();
  const menuPaths = useStore($menuPaths);

  const onFormChange = ({ target }: any) => {
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onCheck = ({ target }: any) => {
    const { checked } = target;

    setFormData({
      ...formData,
      rememberMe: checked
    })

    localStorageSync.rememberMe = +checked;
  }

  useEffect(() => {
    resetStateEv();
    resetRegisterStateEv();
  }, [])

  return (
    <div className={styles.OldLoginFormContainer}>
      <OldLoginWrapper>
        {error && (
          <span className={styles.error}>{error}</span>
        )}
        <OldLoginInput
          name="username"
          placeholder={t('placeholders.username') as string}
          value={formData.username}
          onChange={onFormChange}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <OldLoginInput
          name="password"
          placeholder={t('placeholders.password') as string}
          value={formData.password}
          onChange={onFormChange}
          type="password"
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <OldLoginButton
          onClick={() => onSubmit(formData)}
          loading={isLoading}
        >
          {t('terminalLogin.submit')}
        </OldLoginButton>
        <div
          className="text-[#889aab] cursor-pointer"
          onClick={() => navigate(menuPaths.reset.path)}
        >{t('terminalLogin.forgotPassword')}</div>
        <div className="flex items-center mt-2">
          <input
            checked={formData.rememberMe}
            id="rememberMe"
            className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 accent-[#557b9f] mr-2"
            type="checkbox"
            name="rememberMe"
            onChange={onCheck}
          />
          <label
            htmlFor="rememberMe"
            className="text-[#889aab] cursor-pointer select-none"
          >{t('terminalLogin.rememberMe')}</label>
        </div>
      </OldLoginWrapper>
    </div>
  )
}
export default OldLoginForm;