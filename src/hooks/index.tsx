import { FC, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<IAppProviderProps> = ({
  children,
}: IAppProviderProps) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
