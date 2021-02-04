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

const DEFAULT_SIZE = 80;
export const Loading = styled.div<{ size?: number }>`
  display: inline-block;
  width: ${(props) => props.size ?? DEFAULT_SIZE}px;
  height: ${(props) => props.size ?? DEFAULT_SIZE}px;

  &:after {
    content: " ";
    display: block;
    width: ${(props) => (props.size ?? DEFAULT_SIZE) * 0.8}px;
    height: ${(props) => (props.size ?? DEFAULT_SIZE) * 0.8}px;
    border-radius: 50%;
    border: 6px solid ${colors.chocolateWeb};
    border-color: ${colors.chocolateWeb} transparent ${colors.chocolateWeb}
      transparent;
    animation: ${loadingAnimation} 1.2s linear infinite;
  }
`;
