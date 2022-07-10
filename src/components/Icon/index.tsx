import { FC } from 'react';
import {
  IconName,
  IconPrefix,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Container } from './styles';

interface IIconProps extends FontAwesomeIconProps {
  prefix?: IconPrefix;
  iconName: IconName;
  size?: SizeProp;
}

const Icon: FC<IIconProps> = ({
  prefix,
  iconName,
  size,
  ...rest
}: IIconProps) => {
  return (
    <Container
      icon={{ prefix: prefix || 'fas', iconName }}
      size={size || '1x'}
      {...rest}
    />
  );
};

export default Icon;
