import { HTMLProps } from "react"
import { inputStyles, labelStyles, terminalChekboxStyles } from "./style"
import { useTranslation } from "react-i18next";
import { callbackSkeleton } from "shared/helpers/genericHelper";

interface Props {
  onChange?: (event?: any) => void;
}

export const TerminalCheckbox: React.FC<HTMLProps<HTMLInputElement> & Props> = ({
  onChange = callbackSkeleton,
  ...props
}) => {

  const {t} = useTranslation()

  return (
    <div className={terminalChekboxStyles}>
      <input 
        className={inputStyles}
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        onChange={onChange}
        {...props}
      />
      <label htmlFor="rememberMe" className={labelStyles}>{t('terminalLogin.rememberMe')}</label>
    </div>
  )
}