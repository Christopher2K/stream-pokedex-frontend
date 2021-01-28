import { FC, useCallback } from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { colors, fontSize } from "style/primitive";

const commonStyle = css`
  color: ${colors.ming};

  font-size: ${fontSize.bigBody};
  font-weight: 600;

  border-width: 2px;
  border-style: solid;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const Root = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: flex-start;
  max-width: 500px;
  width: 100%;
`;

const Input = styled.input<{ hasText?: boolean }>`
  ${commonStyle}

  flex-shrink: 1;

  height: 50px;
  width: 100%;
  margin-right: 20px;

  border-color: ${({ hasText }) =>
    hasText ? colors.middleBlueGreen : colors.black};
  padding: 0 10px;

  &:focus {
    border-color: ${colors.middleBlueGreen};
  }
`;

const Button = styled.button`
  ${commonStyle}

  white-space: nowrap;
  flex-shrink: 0;
  border-color: ${colors.middleBlueGreen};
  background-color: ${colors.middleBlueGreen};
  cursor: pointer;

  &:focus {
    border-color: ${colors.ming};
  }
`;

type SearchProps = {
  onSearch(value: string): void;
};

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const updateValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const onFormSubmit = useCallback(
    function onButtonClick(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      onSearch(value);
    },
    [onSearch, value]
  );

  // const onEnterPressed = useCallback(
  //   function onEnterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
  //     if (event.key === "Enter") {
  //       onSearch(value);
  //     }
  //   },
  //   [onSearch, value]
  // );

  return (
    <Root onSubmit={onFormSubmit}>
      <Input
        placeholder="e.g. Pikachu"
        value={value}
        onChange={updateValue}
        hasText={value.length > 0}
      />
      <Button type="submit">Catch it !</Button>
    </Root>
  );
};
