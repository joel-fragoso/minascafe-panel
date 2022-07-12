import { IconName } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useModal } from '../../hooks/modal';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import isIconName from '../../utils/getIconsNames';
import {
  Action,
  Badge,
  Body,
  Column,
  Container,
  Head,
  Row,
  Table,
} from './styles';

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
  createdAt: IDate;
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

  const deleteIdRef = useRef<string>('');

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

  const deleteConfirmed = useCallback(async () => {
    await api.delete(`/categorias/${deleteIdRef.current}`);

    getCategories();

    hideModal();
  }, [getCategories, hideModal]);

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
            <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'plus' }} />
            Adicionar
          </Link>
        </div>
        <Table>
          <Head>
            <Row>
              <Column size="40%">Ícone</Column>
              <Column>Nome</Column>
              <Column size="50%">Ativo</Column>
              <Column>Data de criação</Column>
              <Column>Data de atualização</Column>
              <Column size="40%">Ações</Column>
            </Row>
          </Head>
          <Body>
            {categories &&
              categories.map(category => (
                <Row key={category.id}>
                  {category.id === modify ? (
                    <>
                      <Column size="40%">
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
                      </Column>
                      <Column>
                        <input
                          type="text"
                          ref={e => {
                            nameRef[category.id] = e;
                          }}
                          defaultValue={category.name}
                        />
                      </Column>
                      <Column size="50%">
                        <input
                          ref={e => {
                            activeRef[category.id] = e;
                          }}
                          type="checkbox"
                          defaultChecked={category.active}
                        />
                      </Column>
                    </>
                  ) : (
                    <>
                      <Column size="40%">
                        <Icon iconName={category.icon} />
                      </Column>
                      <Column>{category.name}</Column>
                      <Column size="50%">
                        {category.active ? (
                          <div>
                            <Badge active />
                            Sim
                          </div>
                        ) : (
                          <div>
                            <Badge />
                            Não
                          </div>
                        )}
                      </Column>
                    </>
                  )}
                  <Column>
                    {new Date(category.createdAt.date).toLocaleString()}
                  </Column>
                  <Column>
                    {category.updatedAt?.date
                      ? new Date(category.updatedAt.date).toLocaleString()
                      : 'N/D'}
                  </Column>
                  <Column size="40%">
                    <Action
                      type="button"
                      onClick={() => {
                        modify === category.id
                          ? modifyCategory(category.id, 'apply')
                          : modifyCategory(category.id, 'start');
                      }}
                    >
                      <Icon iconName="pencil" />
                    </Action>
                    <Action
                      type="button"
                      color="danger"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Icon iconName="trash" />
                    </Action>
                  </Column>
                </Row>
              ))}
          </Body>
        </Table>
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
