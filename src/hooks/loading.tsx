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
  setLoading(value: boolean): void;
}

interface ILoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export const LoadingProvider: FC<ILoadingProviderProps> = ({
  children,
}: ILoadingProviderProps) => {
  const [data, setData] = useState<boolean>(false);

  const setLoading = useCallback((value: boolean) => {
    setData(value);
  }, []);

  const loadingMemo = useMemo(
    () => ({ loading: data, setLoading }),
    [data, setLoading],
  );

  return (
    <LoadingContext.Provider value={loadingMemo}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): ILoadingContext {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading deve ser utilizado dentro de LoadingProvider');
  }

  return context;
}
