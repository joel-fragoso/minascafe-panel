import { FC, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { CardProvider } from './card';
import { CategoriesProvider } from './categories';
import { LoadingProvider } from './loading';
import { ModalProvider } from './modal';
import { ProductsProvider } from './products';
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
          <ToastProvider>
            <CardProvider>
              <CategoriesProvider>
                <ProductsProvider>{children}</ProductsProvider>
              </CategoriesProvider>
            </CardProvider>
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
