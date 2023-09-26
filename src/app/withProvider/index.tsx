import compose from "compose-function";
import { withRouter } from "./with-routes";

export const withProviders = compose(withRouter);
