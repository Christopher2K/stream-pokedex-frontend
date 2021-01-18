import { FC } from "react";
import { render } from "react-dom";
import { Global } from "@emotion/react";

import { Router } from "router";
import { reset } from "style/reset";
import { root } from "style/root";

export const App: FC = () => (
  <>
    <Global styles={reset} />
    <Global styles={root} />
    <Router />
  </>
);

render(<App />, document.getElementById("root"));
