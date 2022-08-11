import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ISidebarContext {
  expanded: boolean;
  setExpanded(value: boolean): void;
}

interface ISidebarProviderProps {
  children: ReactNode;
}

const SidebarContext = createContext<ISidebarContext>({} as ISidebarContext);

export const SidebarProvider: FC<ISidebarProviderProps> = ({
  children,
}: ISidebarProviderProps) => {
  const [data, setData] = useState<boolean>(() => {
    const sidebar = localStorage.getItem('@MinasCafe:sidebar');

    if (sidebar) {
      return sidebar === 'true';
    }

    return true;
  });

  const setExpanded = useCallback((value: boolean) => {
    localStorage.setItem('@MinasCafe:sidebar', value.toString());

    setData(value);
  }, []);

  const expandedMemo = useMemo(
    () => ({ expanded: data, setExpanded }),
    [data, setExpanded],
  );

  return (
    <SidebarContext.Provider value={expandedMemo}>
      {children}
    </SidebarContext.Provider>
  );
};

export function useSidebar(): ISidebarContext {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar deve ser utilizado dentro de SidebarProvider');
  }

  return context;
}
