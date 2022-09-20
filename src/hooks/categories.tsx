import { IconName } from '@fortawesome/fontawesome-svg-core';
import { AxiosError } from 'axios';
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
import {
  axiosErrorHandler,
  HttpMessage,
  isErrorMessage,
  isServerErrorMessage,
  ServerStatusCode,
} from '../utils/errorHandler';
import { useAuth } from './auth';
import { useModal } from './modal';
import { IToastMessage, useToast } from './toast';

export interface ICategoryQueryParams {
  active?: 0 | 1;
  order?: 'name' | 'icon' | 'id';
  limit?: number;
  offset?: number;
}

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
  getFilteredCategories(params: ICategoryQueryParams): void;
  getCategory(id: string): void;
  updateCategory(id: string, category: ICategoryFormData): void;
  createCategory(category: ICategoryFormData): void;
  deleteCategory(id: string): void;
  countCategories(): Promise<number>;
  countActiveCategories(): Promise<number>;
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
  const { signOut } = useAuth();

  const handleError = useCallback(
    (err: unknown, toast: Omit<IToastMessage, 'id'>) => {
      let toastMessage = toast;

      if (err instanceof AxiosError) {
        const errorHandler = axiosErrorHandler(err);

        toastMessage.description = err.response?.data.error.message;

        if (errorHandler.type === HttpMessage.Unauthorized) {
          if (isErrorMessage(errorHandler.response)) {
            toastMessage = {
              type: 'error',
              title: 'Erro ao verificar as credênciais',
              description: `Ocorreu um erro ao verificar as credênciais. ${errorHandler.response.error}`,
            };

            signOut();
          }
        }

        if (errorHandler.type === HttpMessage.ServerError) {
          if (isServerErrorMessage(errorHandler.response)) {
            if (
              errorHandler.response.error.code ===
              ServerStatusCode.IntegrityConstraintViolation
            ) {
              toastMessage = {
                type: 'error',
                title: 'Erro ao excluir categoria',
                description:
                  'Ocorreu um erro ao excluir a categoria, a categoria possui produtos.',
              };
            }

            if (
              errorHandler.response.error.code === ServerStatusCode.DataTooLong
            ) {
              toastMessage = {
                type: 'error',
                title: 'Erro ao atualizar/criar categoria',
                description: `Ocorreu um erro ao atualizar/criar um categoria, um campo extrapolou o limite`,
              };
            }
          }
        }
      }

      addToast(toastMessage);
    },
    [addToast, signOut],
  );

  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/categorias');

      setDataCollection(response.data.data);
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar categorias',
        description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
      });
    }
  }, [handleError]);

  const getFilteredCategories = useCallback(
    async (params: ICategoryQueryParams) => {
      try {
        const response = await api.get('/categorias', { params });

        setDataCollection(response.data.data);
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao buscar categorias',
          description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
        });
      }
    },
    [handleError],
  );

  const getCategory = useCallback(
    async (id: string) => {
      try {
        const response = await api.get(`/categorias/${id}`);

        setData(response.data.data);
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao buscar categoria',
          description: `Ocorreu um erro ao tentar buscar a categoria ${id}, tente novamente`,
        });
      }
    },
    [handleError],
  );

  const updateCategory = useCallback(
    async (id: string, category: ICategoryFormData) => {
      try {
        await api.put(`/categorias/${id}`, {
          ...category,
          active: category.active ?? false,
        });

        addToast({
          type: 'success',
          title: 'Categoria atualizada',
          description: `Categoria ${category.name} atualizada com sucesso`,
        });
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao modificar categoria',
          description: `Ocorreu um erro ao tentar modificar a categoria ${id}, tente novamente`,
        });
      }

      getCategories();
    },
    [addToast, getCategories, handleError],
  );

  const createCategory = useCallback(
    async (category: ICategoryFormData) => {
      try {
        await api.post('/categorias', {
          ...category,
          active: category.active ?? false,
        });

        addToast({
          type: 'success',
          title: 'Categoria criada',
          description: `Categoria ${category.name} criada com sucesso`,
        });
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao criar categoria',
          description: `Ocorreu um erro ao tentar criar a categoria, tente novamente`,
        });
      }

      getCategories();
    },
    [addToast, getCategories, handleError],
  );

  const deleteConfirmed = useCallback(async () => {
    try {
      await api.delete(`/categorias/${deleteIdRef.current}`);

      addToast({
        type: 'success',
        title: 'Categoria excluída',
        description: `Categoria ${deleteIdRef.current} exluída com sucesso`,
      });
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao exluir',
        description: 'Ocorreu um erro ao tentar excluir o registro',
      });
    }

    getCategories();
    hideModal();
  }, [addToast, getCategories, handleError, hideModal]);

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
        handleError(error, {
          type: 'error',
          title: 'Erro ao deletar categoria',
          description: `Ocorreu um erro ao tentar deletar a categoria, tente novamente`,
        });
      }
    },
    [deleteConfirmed, handleError, showModal],
  );

  const countCategories = useCallback(async (): Promise<number> => {
    try {
      const response = await api.get('/categorias');

      return response.data.data.length;
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar categorias',
        description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
      });

      return 0;
    }
  }, [handleError]);

  const countActiveCategories = useCallback(async (): Promise<number> => {
    try {
      const response = await api.get('/categorias');

      const count = response.data.data.reduce(
        (counter: number, category: ICategory) => {
          return category.active ? counter + 1 : counter;
        },
        0,
      );

      return count;
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar categorias',
        description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
      });

      return 0;
    }
  }, [handleError]);

  const categoriesMemo = useMemo(
    () => ({
      categories: dataCollection,
      category: data,
      getCategories,
      getFilteredCategories,
      getCategory,
      updateCategory,
      createCategory,
      deleteCategory,
      countCategories,
      countActiveCategories,
    }),
    [
      dataCollection,
      data,
      getCategories,
      getFilteredCategories,
      getCategory,
      updateCategory,
      createCategory,
      deleteCategory,
      countCategories,
      countActiveCategories,
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
