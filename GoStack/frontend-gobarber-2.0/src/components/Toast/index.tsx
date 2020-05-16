import React from 'react';
import { MdInfo, MdClose } from 'react-icons/md';
import { Container, Toast } from './styles';

import { ToastMessage, useToast } from '../../hooks/ToastContext';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastComponent = ({ messages }: ToastProps) => {
  const { removeToast } = useToast();
  return (
    <Container>
      {messages.map((message) => (
        <Toast
          key={message.id}
          type={message.type}
          hasDescription={!!message.description}
        >
          <MdInfo size={18} />

          <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
          </div>

          <button onClick={() => removeToast(message.id)} type="button">
            <MdClose size={18} />
          </button>
        </Toast>
      ))}
    </Container>
  );
};
export default ToastComponent;
