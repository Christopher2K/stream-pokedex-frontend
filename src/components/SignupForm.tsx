import { FC } from "react";
import { Button } from "./Button";
import styled from "@emotion/styled";
import { colors, fontSize } from "style/primitive";

const Container = styled.form`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  flex-direction: flex-start;
  align-items: center;

  width: 500px;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;

  label {
    display: block;
    width: 100%;
    margin-bottom: 10px;

    color: ${colors.ming};
    font-size: ${fontSize.bigBody};
    font-weight: bold;
  }

  input {
    display: block;
    width: 100%;
    font-size: ${fontSize.body};
    height: 40px;

    color: ${colors.ming};

    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
    padding: 0 10px;

    &:focus {
      outline: none;
    }
  }
`;

export const SignupForm: FC = () => {
  return (
    <Container>
      <InputContainer>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </InputContainer>
      <Button>Create my account</Button>
    </Container>
  );
};
