import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import { useModal } from '../../hooks/modal';
import isIconName from '../../utils/getIconsNames';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';
import Icon from '../../components/Icon';
import { useToast } from '../../hooks/toast';

export type KeyOfId = keyof MutableRefObject<HTMLInputElement | null>;

export interface IDate {
  date: string;
  timezoneType: string;
  timezone: string;
}

export interface ICategoryProps {
  id: KeyOfId;
  name: string;
  icon: IconName;
  active: boolean;
  createdAt?: IDate;
  updatedAt?: IDate;
}

const Category: FC = () => {
  const iconNameList = [...new Set(Object.values(fas))];
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [iconName, setIconName] = useState<string | undefined>(undefined);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const iconRef = useRef<HTMLInputElement | null>(null);
  const activeRef = useRef<HTMLInputElement | null>(null);
  const [modify, setModify] = useState<string>('');

  const { showModal, hideModal } = useModal();
  const { addToast } = useToast();

  const deleteIdRef = useRef<string>('');

  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/categorias');

      setCategories(response.data.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar',
        description: 'Ocorreu um erro ao tentar carregar as categorias',
      });
    }
  }, [addToast]);

  const modifyCategory = useCallback(
    async (id: KeyOfId, action: string) => {
      if (action === 'start') {
        setModify(id);
      }

      if (action === 'apply') {
        const icon = iconRef[id]?.value;
        const name = nameRef[id]?.value;
        const active = activeRef[id]?.checked;

        if (name && isIconName(icon)) {
          const formData = {
            name,
            icon,
            active,
          };

          await api.put(`/categorias/${id}`, formData);
          await getCategories();
        }

        setModify('');
      }
    },
    [getCategories],
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
      deleteIdRef.current = id;

      showModal({
        type: 'error',
        title: 'Excluir item',
        description: 'Você deseja excluir esse item?',
        onConfirmation: deleteConfirmed,
      });
    },
    [deleteConfirmed, showModal],
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <MainLayout>
      <Container>
        <div>
          <h1>Categorias</h1>
          <Link to="adicionar">
            <Icon iconName="plus" />
            Adicionar
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Categorias</th>
              <th>Ativo</th>
              <th>Data Criação</th>
              <th>Data Atualizado</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map(category => (
                <tr key={category.id}>
                  {category.id === modify ? (
                    <>
                      <td>
                        {isIconName(iconName) ? (
                          <Icon iconName={iconName} />
                        ) : (
                          <Icon iconName={category.icon} />
                        )}
                        <input
                          list="iconNames"
                          ref={e => {
                            iconRef[category.id] = e;
                          }}
                          defaultValue={category.icon}
                          onChange={e => setIconName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          ref={e => {
                            nameRef[category.id] = e;
                          }}
                          defaultValue={category.name}
                        />
                      </td>
                      <td>
                        <input
                          ref={e => {
                            activeRef[category.id] = e;
                          }}
                          type="checkbox"
                          defaultChecked={category.active}
                        />
                      </td>
                      <td>
                        {category.createdAt?.date &&
                          new Date(category.createdAt.date).toLocaleString()}
                      </td>
                      <td>
                        {category.updatedAt?.date &&
                          new Date(category.updatedAt.date).toLocaleString()}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <Icon iconName={category.icon} />
                      </td>
                      <td>{category.name}</td>
                      <td>{category.active ? 'Sim' : 'Não'}</td>
                      <td>
                        {category.createdAt?.date &&
                          new Date(category.createdAt.date).toLocaleString()}
                      </td>
                      <td>
                        {category.updatedAt?.date &&
                          new Date(category.updatedAt.date).toLocaleString()}
                      </td>
                    </>
                  )}
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        modify === category.id
                          ? modifyCategory(category.id, 'apply')
                          : modifyCategory(category.id, 'start');
                      }}
                    >
                      <Icon iconName="pencil" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Icon iconName="trash" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <datalist id="iconNames">
          {iconNameList.map(fasIcon => (
            <option
              key={fasIcon.iconName}
              value={fasIcon.iconName}
              label={fasIcon.iconName}
            />
          ))}
        </datalist>
      </Container>
    </MainLayout>
  );
};

export default Category;
