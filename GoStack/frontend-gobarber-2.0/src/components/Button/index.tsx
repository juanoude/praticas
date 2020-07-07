import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

import loadingGif from '../../assets/loading.gif';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="submit" {...rest}>
    {loading ? <img src={loadingGif} alt="loading" /> : children}
  </Container>
);

export default Button;
