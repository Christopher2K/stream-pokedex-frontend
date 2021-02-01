import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors } from "style/primitive";

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid ${colors.chocolateWeb};
    border-color: ${colors.chocolateWeb} transparent ${colors.chocolateWeb}
      transparent;
    animation: ${loadingAnimation} 1.2s linear infinite;
  }
`;
