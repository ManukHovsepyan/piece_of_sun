import { HTMLProps } from "react"
import { callbackSkeleton } from "shared/helpers/genericHelper";
import styles from "./style.module.scss"

interface Props {
  icon?: any,
  onChange?: (event?: any) => void;
}

export const TerminalInput: React.FC<HTMLProps<HTMLInputElement> & Props> = ({
  icon,
  onChange = callbackSkeleton,
  ...props
}) => {
  return (
    <div className={styles.loginInputDiv}>
      <div className="flex text-[1em] relative font-normal text-[#000000de] rounded-xl">
        <input
          className={styles.loginInput}
          {...props}
          onChange={onChange}
        />
        <span className={styles.iconContainer}>
          {icon}
        </span>
      </div>
    </div>
  )
}