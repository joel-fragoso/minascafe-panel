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
import { Container, Error } from './styles';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string;
  label: string;
  containerStyle?: object;
}

const Checkbox: FC<ICheckboxProps> = ({
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
      data-testid="checkbox-container"
    >
      <label htmlFor={name}>{label}</label>
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
      {error && (
        <Error title={error}>
          <Icon iconName="circle-exclamation" />
        </Error>
      )}
    </Container>
  );
};

export default Checkbox;
