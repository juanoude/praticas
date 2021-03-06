import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #666360;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `};

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    flex: 1;
    color: #f4ede8;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  color: #c53030;
  height: 21px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background-color: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
