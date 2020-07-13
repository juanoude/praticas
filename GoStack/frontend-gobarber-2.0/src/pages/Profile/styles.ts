import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      svg {
        width: 30px;
        height: 30px;
        color: #999691;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: -90px auto 0;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    margin-bottom: 24px;
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  margin-bottom: 32px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    bottom: 4%;
    right: 4%;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 0;
    background: #ff9000;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    svg {
      width: 20px;
      height: 20px;
      color: #28262e;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    input {
      display: none;
    }
  }
`;
