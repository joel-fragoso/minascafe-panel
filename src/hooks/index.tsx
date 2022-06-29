import { FC, ReactNode } from 'react';
import { LoadingProvider } from './loading';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<IAppProviderProps> = ({
  children,
}: IAppProviderProps) => {
  return <LoadingProvider>{children}</LoadingProvider>;
};

export default AppProvider;
