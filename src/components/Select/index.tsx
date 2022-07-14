import {
  FC,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import Icon from '../Icon';

interface IOption {
  value: string | number;
  label: string;
  iconName?: IconName;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<IOption>;
  iconAlign?: 'left' | 'right';
  containerStyle?: object;
}

const Select: FC<ISelectProps> = ({
  name,
  options,
  iconAlign,
  containerStyle = {},
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [iconName, setIconName] = useState<IconName | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });

    setIconName(
      options.find(option => option.value === selectRef.current?.value)
        ?.iconName,
    );
  }, [fieldName, options, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="select-container"
    >
      {iconName && iconAlign !== 'right' && (
        <Icon iconName={iconName} fixedWidth />
      )}
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        onChange={e =>
          setIconName(
            options.find(option => option.value === e.target.value)?.iconName,
          )
        }
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {iconName && iconAlign === 'right' && (
        <Icon iconName={iconName} fixedWidth />
      )}
      {error && (
        <Error title={error}>
          <Icon iconName="circle-exclamation" />
        </Error>
      )}
    </Container>
  );
};

export default Select;
