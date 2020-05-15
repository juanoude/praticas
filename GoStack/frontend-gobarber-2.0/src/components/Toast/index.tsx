import React from 'react';
import { MdInfo, MdClose } from 'react-icons/md';
import { Container, Toast } from './styles';

const ToastComponent = () => (
  <Container>
    <Toast hasDescription>
      <MdInfo size={18} />

      <div>
        <strong> Aconteceu um erro </strong>
        <p> Não foi possível fazer login na aplicação</p>
      </div>

      <button type="button">
        <MdClose size={18} />
      </button>
    </Toast>

    <Toast type="success" hasDescription={false}>
      <MdInfo size={18} />

      <div>
        <strong> Aconteceu um erro </strong>
      </div>

      <button type="button">
        <MdClose size={18} />
      </button>
    </Toast>

    <Toast type="error" hasDescription>
      <MdInfo size={18} />

      <div>
        <strong> Aconteceu um erro </strong>
        <p> Não foi possível fazer login na aplicação</p>
      </div>

      <button type="button">
        <MdClose size={18} />
      </button>
    </Toast>
  </Container>
);

export default ToastComponent;
