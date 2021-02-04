import { FC, useCallback, useState } from "react";
import styled from "@emotion/styled";
import Color from "color";

import { Button } from "./Button";
import { colors, fontSize } from "style/primitive";
import { signup } from "services/authentication";
import { Loading } from "./Loading";

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
    box-sizing: border-box;

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

const LoadingContainer = styled.div<{ visible: boolean }>`
  margin-bottom: 40px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const ErrorContainer = styled.div<{ visible: boolean }>`
  width: 100%;
  margin-bottom: 40px;
  padding: 10px;
  background-color: ${Color(colors.danger).lighten(0.5).hex()};
  box-sizing: border-box;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};

  p {
    color: ${Color(colors.danger).darken(0.5).hex()};
    text-align: center;
    height: 16px;
  }
`;

export type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

export const SignupForm: FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    password: "",
    email: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = useCallback(
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setLoading(true);
      setError(undefined);

      try {
        await signup(formData);
      } catch (e) {
        setError(e.message ?? "Server error, try again later");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const onInputValueChange = useCallback(
    function onInputValueChange(event: React.ChangeEvent<HTMLInputElement>) {
      const target = event.target;
      const name = (target.name as unknown) as keyof SignupFormData;

      setFormData({
        ...formData,
        [name]: target.value,
      });
    },
    [formData]
  );

  return (
    <Container onSubmit={onSubmit}>
      <ErrorContainer visible={Boolean(error)}>
        <p>{error}</p>
      </ErrorContainer>
      <InputContainer>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={onInputValueChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputValueChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onInputValueChange}
        />
      </InputContainer>
      <LoadingContainer visible={isLoading}>
        <Loading size={20} />
      </LoadingContainer>
      <Button disabled={isLoading}>Create my account</Button>
    </Container>
  );
};
