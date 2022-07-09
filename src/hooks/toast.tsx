import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface IToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

interface IToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: FC<IToastProviderProps> = ({
  children,
}: IToastProviderProps) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = uuidv4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  const toastMemo = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={toastMemo}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser utilizado dentro de ToastProvider');
  }

  return context;
}
