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
import { useAuth } from './auth';

interface IAvatarContext {
  avatar: string;
  updateAvatar(avatar: string): void;
}

interface IAvatarProviderProps {
  children: ReactNode;
}

const AvatarContext = createContext<IAvatarContext>({} as IAvatarContext);

export const AvatarProvider: FC<IAvatarProviderProps> = ({
  children,
}: IAvatarProviderProps) => {
  const [data, setData] = useState('');

  const { user, updateUser } = useAuth();

  const updateAvatar = useCallback(
    async (avatar: string) => {
      const response = await api.post(
        `usuarios/avatar/${user.id}`,
        { avatar },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      await updateUser({
        ...response.data.data,
      });

      setData(avatar);
    },
    [updateUser, user],
  );

  const avatarMemo = useMemo(
    () => ({ avatar: data, updateAvatar }),
    [data, updateAvatar],
  );
  return (
    <AvatarContext.Provider value={avatarMemo}>
      {children}
    </AvatarContext.Provider>
  );
};

export function useAvatar(): IAvatarContext {
  const context = useContext(AvatarContext);

  return context;
}
