import { FC } from "react";
import styled from "@emotion/styled";

import { Navbar } from "./Navbar";
import { keySizes } from "style/primitive";

const Content = styled.div`
  width: 100%;
  max-width: ${keySizes.maxWidth};
  margin: 20px auto;
`;

export const PageContainer: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
    </>
  );
};
