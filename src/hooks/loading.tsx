import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ILoadingContext {
  loading: boolean;
  handleLoading(value: boolean): void;
}

interface ILoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export const LoadingProvider: FC<ILoadingProviderProps> = ({
  children,
}: ILoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const loadingMemo = useMemo(
    () => ({ loading, handleLoading }),
    [loading, handleLoading],
  );

  return (
    <LoadingContext.Provider value={loadingMemo}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): ILoadingContext {
  const context = useContext(LoadingContext);

  return context;
}
