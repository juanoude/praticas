import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface UserData {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
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
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  logOut(): void;
  updateUser(user: any): Promise<void>;
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
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
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

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const updateUser = useCallback(async (user) => {
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData((state) => ({
      token: state.token,
      user
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, loading, logOut, updateUser }}
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
