import { Suspense } from "react";
import LoaderPage from "shared/ui/LoaderPage";

export const withRouter = (component: () => React.ReactNode) => () => {
  
  return (
    <Suspense fallback={<LoaderPage />}>{component()}</Suspense>
  );
}
