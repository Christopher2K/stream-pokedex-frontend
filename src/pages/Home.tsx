import { FC } from "react";
import styled from "@emotion/styled";

import { PageContainer, Search } from "components";
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Home: FC = () => (
  <PageContainer>
    <Wrapper>
      <Title>Find your favorite Pokemon !</Title>
      <Search />
    </Wrapper>
  </PageContainer>
);
