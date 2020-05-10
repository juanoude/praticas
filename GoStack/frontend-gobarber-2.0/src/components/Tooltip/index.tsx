import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
  return (
    <Container>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
