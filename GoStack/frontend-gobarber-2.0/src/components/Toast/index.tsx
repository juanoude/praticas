import React from 'react';

import { useTransition } from 'react-spring';
import { Container } from './styles';
import Toast from './SubToast';

import { ToastMessage } from '../../hooks/ToastContext';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastComponent = ({ messages }: ToastProps) => {
  const animatedMessages = useTransition(messages, (message) => message.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 }
  });

  return (
    <Container>
      {animatedMessages.map(({ item, key, props }) => (
        <Toast message={item} style={props} key={key} />
      ))}
    </Container>
  );
};
export default ToastComponent;
