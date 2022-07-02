// eslint-disable-next-line prettier/prettier
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredential {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: User;
  signIn(credentials: SignInCredential): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MinasCafe:token');
    const user = localStorage.getItem('@MinasCafe:user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredential) => {
    const response = await api.post('/autenticacao', {
      email,
      password,
    });

    const { token, user } = response.data.data;

    localStorage.setItem('@MinasCafe:token', token);
    localStorage.setItem('@MinasCafe:user', JSON.stringify(user));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MinasCafe:token');
    localStorage.removeItem('@MinasCafe:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@MinasCafe:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const authenticationMemo = useMemo(
    () => ({ user: data.user, signIn, signOut, updateUser }),
    [data.user, signIn, signOut, updateUser],
  );

  return (
    <AuthContext.Provider value={authenticationMemo}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}
