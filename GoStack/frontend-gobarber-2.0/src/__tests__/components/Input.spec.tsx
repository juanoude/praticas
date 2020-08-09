import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'email',
    defaultValue: '',
    error: '',
    registerField: jest.fn()
  })
}));

describe('Input', () => {
  it('should be able to render a input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const InputElement = getByPlaceholderText('E-mail');

    expect(InputElement).toBeTruthy();
  });

  it('should be able to highlight on focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const InputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(InputElement);

    const containerElement = getByTestId('input-container');

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'color: #ff9000; border-color: #ff9000'
      );
    });

    fireEvent.blur(InputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle(
        'color: #ff9000; border-color: #ff9000'
      );
    });
  });

  it('should not lose the highlight when blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const InputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(InputElement, { target: { value: 'joao@gmail.com' } });

    fireEvent.blur(InputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
