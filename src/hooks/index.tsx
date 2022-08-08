import { FC, ReactNode } from 'react';
import { AuthProvider } from './auth';
import { AvatarProvider } from './avatar';
import { CardProvider } from './card';
import { CategoriesProvider } from './categories';
import { LoadingProvider } from './loading';
import { ModalProvider } from './modal';
import { ProductsProvider } from './products';
import { SidebarProvider } from './sidebar';
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
        <AvatarProvider>
          <ModalProvider>
            <ToastProvider>
              <SidebarProvider>
                <CardProvider>
                  <CategoriesProvider>
                    <ProductsProvider>{children}</ProductsProvider>
                  </CategoriesProvider>
                </CardProvider>
              </SidebarProvider>
            </ToastProvider>
          </ModalProvider>
        </AvatarProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
