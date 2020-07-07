import React, { useEffect } from 'react';

import { MdInfo, MdClose, MdCheckCircle, MdError } from 'react-icons/md';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/ToastContext';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  success: <MdCheckCircle size={18} />,
  error: <MdError size={18} />,
  info: <MdInfo size={18} />
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      style={style}
      hasDescription={Number(!!message.description)}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <MdClose size={18} />
      </button>
    </Container>
  );
};

export default Toast;
