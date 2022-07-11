import { FC, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';
import { ModalProvider } from './modal';
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
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
