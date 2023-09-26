import { LoaderPageImageStyles, LoaderPageStyles } from "./style";
import Logo from 'assets/images/logo-main.png'

const LoaderPage = () => {
	return (
		<div className={LoaderPageStyles}>
			<img src={Logo} alt="Logo" className={LoaderPageImageStyles} />
		</div>
	);
};

export default LoaderPage;