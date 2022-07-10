import { FC } from 'react';
import {
  IconName,
  IconPrefix,
  SizeProp,
} from '@fortawesome/fontawesome-svg-core';
import { Container } from './styles';

interface IIconProps {
  prefix?: IconPrefix;
  iconName: IconName;
  size?: SizeProp;
}

const Icon: FC<IIconProps> = ({ prefix, iconName, size }: IIconProps) => {
  return (
    <Container
      icon={{ prefix: prefix || 'fas', iconName }}
      size={size || '1x'}
    />
  );
};

export default Icon;
