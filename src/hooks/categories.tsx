import { IconName } from '@fortawesome/fontawesome-svg-core';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ICategoryFormData } from '../pages/FormCategory';
import api from '../services/api';
import { useModal } from './modal';
import { useToast } from './toast';

export interface IDate {
  date: Date;
  timezone_type: number;
  timezone: string;
}

export interface ICategory {
  id: string;
  name: string;
  icon: IconName;
  active: boolean;
  createdAt: IDate;
  updatedAt?: IDate;
}

interface ICategoriesContext {
  categories: ICategory[];
  category: ICategory;
  getCategories(): void;
  getCategory(id: string): void;
  updateCategory(id: string, category: ICategoryFormData): void;
  createCategory(category: ICategoryFormData): void;
  deleteCategory(id: string): void;
}

interface ICategoriesProviderProps {
  children: ReactNode;
}

const CategoriesContext = createContext<ICategoriesContext>(
  {} as ICategoriesContext,
);

export const CategoriesProvider: FC<ICategoriesProviderProps> = ({
  children,
}: ICategoriesProviderProps) => {
  const [dataCollection, setDataCollection] = useState<ICategory[]>([]);
  const [data, setData] = useState<ICategory>({} as ICategory);

  const deleteIdRef = useRef<string>('');

  const { addToast } = useToast();
  const { showModal, hideModal } = useModal();

  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/categorias');

      setDataCollection(response.data.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao buscar categorias',
        description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
      });
    }
  }, [addToast]);

  const getCategory = useCallback(
    async (id: string) => {
      try {
        const response = await api.get(`/categorias/${id}`);

        setData(response.data.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar categoria',
          description: `Ocorreu um erro ao tentar buscar a categoria ${id}, tente novamente`,
        });
      }
    },
    [addToast],
  );

  const updateCategory = useCallback(
    async (id: string, category: ICategoryFormData) => {
      try {
        await api.put(`/categorias/${id}`, {
          ...category,
          active: category.active ?? false,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao modificar categoria',
          description: `Ocorreu um erro ao tentar modificar a categoria ${id}, tente novamente`,
        });
      }

      getCategories();
    },
    [addToast, getCategories],
  );

  const createCategory = useCallback(
    async (category: ICategoryFormData) => {
      try {
        await api.post('/categorias', {
          ...category,
          active: category.active ?? false,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao criar categoria',
          description: `Ocorreu um erro ao tentar criar a categoria, tente novamente`,
        });
      }

      getCategories();
    },
    [addToast, getCategories],
  );

  const deleteConfirmed = useCallback(async () => {
    try {
      await api.delete(`/categorias/${deleteIdRef.current}`);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao exluir',
        description: 'Ocorreu um erro ao tentar excluir o registro',
      });
    }

    getCategories();
    hideModal();
  }, [addToast, getCategories, hideModal]);

  const deleteCategory = useCallback(
    (id: string) => {
      try {
        deleteIdRef.current = id;

        showModal({
          type: 'error',
          title: 'Excluir item',
          description: 'Você deseja excluir esse item?',
          onConfirmation: deleteConfirmed,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar categoria',
          description: `Ocorreu um erro ao tentar deletar a categoria, tente novamente`,
        });
      }
    },
    [addToast, deleteConfirmed, showModal],
  );

  const categoriesMemo = useMemo(
    () => ({
      categories: dataCollection,
      category: data,
      getCategories,
      getCategory,
      updateCategory,
      createCategory,
      deleteCategory,
    }),
    [
      data,
      dataCollection,
      getCategories,
      getCategory,
      updateCategory,
      createCategory,
      deleteCategory,
    ],
  );

  return (
    <CategoriesContext.Provider value={categoriesMemo}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      'useCategories deve ser utilizado dentro de CategoriesProvider',
    );
  }

  return context;
}
