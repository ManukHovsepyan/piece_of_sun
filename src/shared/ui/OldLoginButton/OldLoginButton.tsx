import { Loader } from "../Loader";
import styles from "./styles/old-login-button.module.scss";
import './styles/style.scss'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  children: any;
  loading?: boolean;
}

const OldLoginButton: React.FC<Props> = ({
  children,
  loading = false,
  onClick,
  ...attributes
}) => {
  const onButtonClick = (event: any) => {
    if (loading) return;
    onClick && onClick(event);
  }
	return (
		<button
      className={styles.button + ' button-loader'}
      onClick={onButtonClick}
      {...attributes}
      type="button"
    >{!loading ? children : (
      <Loader />
    )}</button>
	);
};

export default OldLoginButton;