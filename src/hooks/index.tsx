import { FC, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<IAppProviderProps> = ({
  children,
}: IAppProviderProps) => {
  return (
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
