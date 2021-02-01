import styled from "@emotion/styled";
import { colors, fontSize } from "style/primitive";

export const Button = styled.button`
  color: #fff;
  background-color: ${colors.chocolateWeb};
  font-size: ${fontSize.body};
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
`;
