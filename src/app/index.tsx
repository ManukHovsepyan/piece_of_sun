import { Routing } from "pages";
import { withProviders } from "./withProvider";
import { Suspense } from "react";
import { AppStyles } from "./style";
import LoaderPage from "shared/ui/LoaderPage";

const App = () => {
  return (
    <div className={AppStyles}>
      <Suspense fallback={<LoaderPage />}><Routing /></Suspense>
    </div>
  );
}

export default withProviders(App);