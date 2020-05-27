import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContext {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  logOut(): void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ]);

      if (user[1] && token[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });

        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  const logOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });
    // console.log(response);
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ]);

    setData({ token, user });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, loading, logOut }}>
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
