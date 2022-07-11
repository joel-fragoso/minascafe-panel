import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Modal from '../components/Modal';

export interface IModalMessage {
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
  onConfirmation(): void;
}

interface IModalContext {
  showModal(message: IModalMessage): void;
  hideModal(): void;
  isOpen: boolean;
}

interface IModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider: FC<IModalProviderProps> = ({
  children,
}: IModalProviderProps) => {
  const [message, setMessage] = useState<IModalMessage | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showModal = useCallback(
    async ({ type, title, description, onConfirmation }: IModalMessage) => {
      setIsOpen(true);
      setMessage({
        type,
        title,
        description,
        onConfirmation,
      });
    },
    [],
  );

  const hideModal = useCallback(() => {
    setMessage(null);
    setIsOpen(false);
  }, []);

  const modalMemo = useMemo(
    () => ({ isOpen, showModal, hideModal }),
    [hideModal, isOpen, showModal],
  );

  return (
    <ModalContext.Provider value={modalMemo}>
      {children}
      <Modal message={message} />
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal deve ser utilizado dentro de ModalProvider');
  }

  return context;
}
