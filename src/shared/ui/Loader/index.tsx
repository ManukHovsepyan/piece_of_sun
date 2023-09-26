import { LoaderStyles, LoaderDivStyles, LoaderFirstStyles, LoaderSecondStyles, LoaderThirdStyles, LoaderFourthStyles } from "./style";

export const Loader: React.FC<any> = () => {
  return <div className={LoaderStyles}>
    <div className={LoaderDivStyles + LoaderFirstStyles + ' loader-circle'}></div>
    <div className={LoaderDivStyles + LoaderSecondStyles + ' loader-circle'}></div>
    <div className={LoaderDivStyles + LoaderThirdStyles + ' loader-circle'}></div>
    <div className={LoaderDivStyles + LoaderFourthStyles + ' loader-circle'}></div>
  </div>;
};
