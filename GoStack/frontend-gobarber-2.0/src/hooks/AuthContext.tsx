import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserData {
  id: string;
  avatar_url: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string;
  user: UserData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContext {
  user: UserData;
  updateUser(user: UserData): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  logOut(): void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (user && token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const logOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });
    // console.log(response);
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: UserData) => {
      setData({
        token: data.token,
        user
      });
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, logOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('Must be inside the context provider to use this hook');
  }

  return context;
};
