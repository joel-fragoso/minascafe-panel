import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import { Container } from './styles';

interface BreadcrumbProps {
  maxDepth?: number;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ maxDepth }: BreadcrumbProps) => {
  const { pathname } = useLocation();

  const pathNames = pathname.split('/', maxDepth);

  return (
    <Container>
      {pathNames.map((path, i) => {
        let formatedPath = path;

        if (!path) {
          formatedPath = 'dashboard';
        }

        let linkPath = `/${formatedPath}`;

        if (path) {
          const regPath = new RegExp(`(.*${formatedPath})`);
          [, linkPath] = pathname.split(regPath);
        }

        formatedPath =
          formatedPath[0].toUpperCase() + formatedPath.substring(1);

        return (
          <div key={path}>
            {i !== pathNames.length - 1 ? (
              <>
                <Link to={linkPath}>{formatedPath}</Link>
                <Icon iconName="angle-right" />
              </>
            ) : (
              formatedPath
            )}
          </div>
        );
      })}
    </Container>
  );
};

export default Breadcrumb;
