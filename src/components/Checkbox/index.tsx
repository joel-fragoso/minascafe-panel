import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Error } from './styles';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  containerStyle?: object;
}

const Checkbox: FC<ICheckboxProps> = ({
  name,
  label,
  containerStyle = {},
  ...rest
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

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
        type="checkbox"
        onFocus={handleCheckboxFocus}
        onBlur={handleCheckboxBlur}
        defaultValue={defaultValue}
        ref={checkboxRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FontAwesomeIcon
            icon={{ prefix: 'fas', iconName: 'circle-exclamation' }}
            size="1x"
          />
        </Error>
      )}
    </Container>
  );
};

export default Checkbox;
