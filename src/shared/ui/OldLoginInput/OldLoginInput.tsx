import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/old-login-input.module.scss";

interface Props extends React.HTMLProps<HTMLInputElement> {
  icon: any;
  isWithEye?: boolean;
}

const OldLoginInput: React.FC<Props> = ({
  icon,
  isWithEye = false,
  type,
  ...attributes
}) => {
  const [isTextVisible, setIsTextVisible] = useState<boolean>(false);

  const getEyeBlock = () => {
    if (!isWithEye) return null;

    return !isTextVisible
      ? <FontAwesomeIcon onClick={() => setIsTextVisible(true)} icon={faEyeSlash} />
      : <FontAwesomeIcon onClick={() => setIsTextVisible(false)} icon={faEye} />
  }

	return (
		<div className={styles.loginInput}>
      <div className={styles.inputWrapper}>
        <input
          type={isTextVisible ? "text" : type}
          {...attributes}
        />
        <span>{icon}</span>
        {getEyeBlock()}
      </div>
    </div>
	);
};

export default OldLoginInput;