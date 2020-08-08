import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    Link: ({ children }: { children: React.ReactNode }) => children
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn
    })
  };
});

const mockedAddToast = jest.fn();

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'joao@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await waitFor(
      () => {
        expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
      },
      {
        timeout: 4000
      }
    );
  });

  it('should not be able to sign in with the wrong credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should display a toast in a API error response', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'joao@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      );
    });
  });
});
