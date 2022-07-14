import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import Icon from '../Icon';
import { Container, Error, Group } from './styles';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  label?: string;
  containerStyle?: object;
}

const Switch: FC<ICheckboxProps> = ({
  name,
  value,
  label,
  containerStyle = {},
  ...rest
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef,
      getValue: ref => {
        return ref.current.checked;
      },
      clearValue: ref => {
        const clearRef = ref;
        clearRef.current.checked = defaultChecked;
      },
      setValue: (ref, valor) => {
        const setRef = ref;
        setRef.current.checked = valor;
      },
    });
  }, [defaultChecked, fieldName, registerField]);

  const handleCheckboxFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleCheckboxBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!checkboxRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="switch-container"
    >
      <Group label={label}>
        <span>{label}</span>
        <input
          id={name}
          name={name}
          value={value}
          type="checkbox"
          onFocus={handleCheckboxFocus}
          onBlur={handleCheckboxBlur}
          defaultChecked={defaultChecked}
          ref={checkboxRef}
          {...rest}
        />
        <label htmlFor={name}>{null}</label>
      </Group>
      {error && (
        <Error title={error}>
          <Icon iconName="circle-exclamation" />
        </Error>
      )}
    </Container>
  );
};

export default Switch;
