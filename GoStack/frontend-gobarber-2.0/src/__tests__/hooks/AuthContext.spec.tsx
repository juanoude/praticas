import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/AuthContext';
import api from '../../services/api';

const mock = new MockAdapter(api);

describe('Auth Context', () => {
  it('should be able to sign in the user', async () => {
    const signData = {
      user: {
        id: 'user-123',
        name: 'Joao da Silva',
        email: 'joao@gmail.com'
      },
      token: 'token-123'
    };

    mock.onPost('/sessions').reply(200, signData);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    result.current.signIn({
      email: 'joao@gmail.com',
      password: '123123'
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', signData.token);

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(signData.user)
    );

    expect(result.current.user.email).toEqual('joao@gmail.com');
  });

  it('should be able to get user and token from localstorage', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');

    getItem.mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';

        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'Joao da Silva',
            email: 'joao@gmail.com'
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user.email).toEqual('joao@gmail.com');
  });

  it('should be able to remove the data on log out', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.logOut();
    });

    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');

    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update the user', () => {
    const user = {
      id: 'user-123',
      name: 'Joao da Silva',
      email: 'joao@gmail.com',
      avatar_url: '123123'
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(result.current.user).toMatchObject(user);
  });
});
