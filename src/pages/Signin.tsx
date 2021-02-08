import { FC } from "react";
import styled from "@emotion/styled";

import { PageContainer, LoginForm } from "components";
import { colors, fontSize } from "style/primitive";

const Title = styled.h1`
  color: ${colors.ming};
  font-size: ${fontSize.bigTitle};
  text-align: center;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Signin: FC = () => (
  <PageContainer>
    <Title>Sign in with your account</Title>
    <Wrapper>
      <LoginForm />
    </Wrapper>
  </PageContainer>
);
