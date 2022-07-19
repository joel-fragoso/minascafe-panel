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
import { ICategory, IDate } from './categories';
import { useModal } from './modal';
import { useToast } from './toast';

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
  getProduct(id: string): void;
  updateProduct(id: string, product: IProductFormData): void;
  createProduct(product: IProductFormData): void;
  deleteProduct(id: string): void;
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

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get('/produtos');

      setDataCollection(response.data.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao buscar produtos',
        description: `Ocorreu um erro ao tentar buscar os produtos, tente novamente`,
      });
    }
  }, [addToast]);

  const getProduct = useCallback(
    async (id: string) => {
      try {
        const response = await api.get(`/produtos/${id}`);

        setData(response.data.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao buscar produto',
          description: `Ocorreu um erro ao tentar buscar o produto ${id}, tente novamente`,
        });
      }
    },
    [addToast],
  );

  const updateProduct = useCallback(
    async (id: string, product: IProductFormData) => {
      try {
        await api.put(`/produtos/${id}`, {
          ...product,
          price: parseFloat(product.price),
          active: product.active ?? false,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao modificar produto',
          description: `Ocorreu um erro ao tentar modificar o produto ${id}, tente novamente`,
        });
      }

      getProducts();
    },
    [addToast, getProducts],
  );

  const createProduct = useCallback(
    async (product: IProductFormData) => {
      try {
        await api.post('/produtos', {
          ...product,
          price: parseFloat(product.price),
          active: product.active ?? false,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao criar produto',
          description: `Ocorreu um erro ao tentar criar o produto, tente novamente`,
        });
      }

      getProducts();
    },
    [addToast, getProducts],
  );

  const deleteConfirmed = useCallback(async () => {
    try {
      await api.delete(`/produtos/${deleteIdRef.current}`);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao exluir',
        description: 'Ocorreu um erro ao tentar excluir o registro',
      });
    }

    getProducts();
    hideModal();
  }, [addToast, getProducts, hideModal]);

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
        addToast({
          type: 'error',
          title: 'Erro ao deletar produto',
          description: `Ocorreu um erro ao tentar deletar o produto, tente novamente`,
        });
      }
    },
    [addToast, deleteConfirmed, showModal],
  );

  const productsMemo = useMemo(
    () => ({
      products: dataCollection,
      product: data,
      getProducts,
      getProduct,
      updateProduct,
      createProduct,
      deleteProduct,
    }),
    [
      data,
      dataCollection,
      getProducts,
      getProduct,
      updateProduct,
      createProduct,
      deleteProduct,
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
