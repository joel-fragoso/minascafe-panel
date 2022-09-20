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
import { IProductFormData } from '../pages/FormProduct';
import api from '../services/api';
import {
  axiosErrorHandler,
  HttpMessage,
  isErrorMessage,
  isServerErrorMessage,
  ServerStatusCode,
} from '../utils/errorHandler';
import { useAuth } from './auth';
import { ICategory, IDate } from './categories';
import { useModal } from './modal';
import { IToastMessage, useToast } from './toast';

export interface IProductQueryParams {
  active?: 0 | 1;
  order?: 'name' | 'id';
  limit?: number;
  offset?: number;
}
export interface IProduct {
  id: string;
  name: string;
  price: number;
  active: boolean;
  category: ICategory;
  createdAt: IDate;
  updatedAt?: IDate;
}

interface IProductsContext {
  products: IProduct[];
  product: IProduct;
  getProducts(): void;
  getFilteredProducts(params: IProductQueryParams): void;
  getProduct(id: string): void;
  updateProduct(id: string, product: IProductFormData): void;
  createProduct(product: IProductFormData): void;
  deleteProduct(id: string): void;
  countProducts(): Promise<number>;
  countActiveProducts(): Promise<number>;
}

interface IProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<IProductsContext>({} as IProductsContext);

export const ProductsProvider: FC<IProductsProviderProps> = ({
  children,
}: IProductsProviderProps) => {
  const [dataCollection, setDataCollection] = useState<IProduct[]>([]);
  const [data, setData] = useState<IProduct>({} as IProduct);

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
                ServerStatusCode.NumberValueOutOfRange ||
              errorHandler.response.error.code === ServerStatusCode.DataTooLong
            ) {
              toastMessage = {
                type: 'error',
                title: 'Erro ao atualizar/criar produto',
                description: `Ocorreu um erro ao atualizar/criar um produto, um campo extrapolou o limite`,
              };
            }
          }
        }
      }

      addToast(toastMessage);
    },
    [addToast, signOut],
  );

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get('/produtos');

      setDataCollection(response.data.data);
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar produtos',
        description: `Ocorreu um erro ao tentar buscar os produtos, tente novamente`,
      });
    }
  }, [handleError]);

  const getFilteredProducts = useCallback(
    async (params: IProductQueryParams) => {
      try {
        const response = await api.get('/produtos', { params });

        setDataCollection(response.data.data);
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao buscar produtos',
          description: `Ocorreu um erro ao tentar buscar os produtos, tente novamente`,
        });
      }
    },
    [handleError],
  );

  const getProduct = useCallback(
    async (id: string) => {
      try {
        const response = await api.get(`/produtos/${id}`);

        setData(response.data.data);
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao buscar produto',
          description: `Ocorreu um erro ao tentar buscar o produto ${id}, tente novamente`,
        });
      }
    },
    [handleError],
  );

  const updateProduct = useCallback(
    async (id: string, product: IProductFormData) => {
      try {
        await api.put(`/produtos/${id}`, {
          ...product,
          price: parseFloat(product.price),
          active: product.active ?? false,
        });

        addToast({
          type: 'success',
          title: 'Produto atualizado',
          description: `Produto ${product.name} atualizado com sucesso`,
        });
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao modificar produto',
          description: `Ocorreu um erro ao tentar modificar o produto ${id}, tente novamente`,
        });
      }

      getProducts();
    },
    [addToast, getProducts, handleError],
  );

  const createProduct = useCallback(
    async (product: IProductFormData) => {
      try {
        await api.post('/produtos', {
          ...product,
          price: parseFloat(product.price),
          active: product.active ?? false,
        });

        addToast({
          type: 'success',
          title: 'Produto criado',
          description: `Produto ${product.name} criado com sucesso`,
        });
      } catch (error) {
        handleError(error, {
          type: 'error',
          title: 'Erro ao criar produto',
          description: `Ocorreu um erro ao tentar criar o produto, tente novamente`,
        });
      }

      getProducts();
    },
    [addToast, getProducts, handleError],
  );

  const deleteConfirmed = useCallback(async () => {
    try {
      await api.delete(`/produtos/${deleteIdRef.current}`);

      addToast({
        type: 'success',
        title: 'Produto excluído',
        description: `Produto ${deleteIdRef.current} excluído com sucesso`,
      });
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao exluir',
        description: 'Ocorreu um erro ao tentar excluir o registro',
      });
    }

    getProducts();
    hideModal();
  }, [addToast, getProducts, handleError, hideModal]);

  const deleteProduct = useCallback(
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
          title: 'Erro ao deletar produto',
          description: `Ocorreu um erro ao tentar deletar o produto, tente novamente`,
        });
      }
    },
    [deleteConfirmed, handleError, showModal],
  );

  const countProducts = useCallback(async (): Promise<number> => {
    try {
      const response = await api.get('/produtos');

      return response.data.data.length;
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar produtos',
        description: `Ocorreu um erro ao tentar buscar os produtos, tente novamente`,
      });

      return 0;
    }
  }, [handleError]);

  const countActiveProducts = useCallback(async (): Promise<number> => {
    try {
      const response = await api.get('/produtos');

      const count = response.data.data.reduce(
        (counter: number, product: IProduct) => {
          return product.active ? counter + 1 : counter;
        },
        0,
      );

      return count;
    } catch (error) {
      handleError(error, {
        type: 'error',
        title: 'Erro ao buscar produtos',
        description: `Ocorreu um erro ao tentar buscar os produtos, tente novamente`,
      });

      return 0;
    }
  }, [handleError]);

  const productsMemo = useMemo(
    () => ({
      products: dataCollection,
      product: data,
      getProducts,
      getFilteredProducts,
      getProduct,
      updateProduct,
      createProduct,
      deleteProduct,
      countProducts,
      countActiveProducts,
    }),
    [
      dataCollection,
      data,
      getProducts,
      getFilteredProducts,
      getProduct,
      updateProduct,
      createProduct,
      deleteProduct,
      countProducts,
      countActiveProducts,
    ],
  );

  return (
    <ProductsContext.Provider value={productsMemo}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProducts deve ser utilizado dentro de ProductsProvider',
    );
  }

  return context;
}
