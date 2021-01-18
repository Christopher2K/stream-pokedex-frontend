import { css } from "@emotion/css";
import { keySizes } from "./primitive";

export const root = css`
  #root {
    width: 100%;
    max-width: ${keySizes.maxWidth};
    margin: 0 auto;
  }

  body,
  #root {
    min-height: 100%;
  }
`;
