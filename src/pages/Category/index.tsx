import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import MainLayout from '../../layouts/MainLayout';
import isIconName from '../../utils/getIconsNames';
import { Container } from './styles';

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

  const getCategories = useCallback(async () => {
    const response = await api.get('/categorias');

    setCategories(response.data.data);
  }, []);

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

  const deleteCategory = useCallback(
    async (id: string) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Você tem certeza que quer excluir?')) {
        await api.delete(`/categorias/${id}`);

        getCategories();
      }
    },
    [getCategories],
  );

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <MainLayout>
      <Container>
        <div>
          <Link to="adicionar">
            <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'plus' }} />
            Adicionar
          </Link>
        </div>
        <table>
          <caption>Configurar Categorias</caption>
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
                          <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} />
                        ) : (
                          <FontAwesomeIcon
                            icon={{ prefix: 'fas', iconName: category.icon }}
                          />
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
                        <FontAwesomeIcon
                          icon={{ prefix: 'fas', iconName: category.icon }}
                        />
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
                      <FontAwesomeIcon
                        icon={{ prefix: 'fas', iconName: 'pen-to-square' }}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <FontAwesomeIcon
                        icon={{ prefix: 'fas', iconName: 'trash-can' }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                Dados Atualizado: {new Date().toLocaleString()}
              </td>
            </tr>
          </tfoot>
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
