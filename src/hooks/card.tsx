import { IconName } from '@fortawesome/fontawesome-svg-core';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface ICardMessage {
  id: string;
  title: string;
  titleIcon?: IconName;
  description?: string;
  value?: string;
}

interface ICardContext {
  createCard(message: ICardMessage): void;
  messages: ICardMessage[];
}

interface ICardProviderProps {
  children: ReactNode;
}

const CardContext = createContext<ICardContext>({} as ICardContext);

export const CardProvider: FC<ICardProviderProps> = ({
  children,
}: ICardProviderProps) => {
  const [messages, setMessages] = useState<ICardMessage[]>([]);

  const createCard = useCallback(
    ({ id, title, titleIcon, description, value }: ICardMessage) => {
      const card = {
        id,
        title,
        titleIcon,
        description,
        value,
      };

      setMessages(state => {
        if (state.find(message => message.id === id)) {
          const newState = state.map(message => {
            if (message.id === id) {
              return card;
            }

            return message;
          });

          return newState;
        }

        return [...state, card];
      });
    },
    [],
  );

  const cardMemo = useMemo(
    () => ({ createCard, messages }),
    [createCard, messages],
  );

  return (
    <CardContext.Provider value={cardMemo}>{children}</CardContext.Provider>
  );
};

export function useCard() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('useCard deve ser utilizado dentro de CardProvider');
  }

  return context;
}
