import {
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  iconName?: IconName;
  iconAlign?: 'left' | 'right';
}

const Input: FC<InputProps> = ({
  name,
  containerStyle = {},
  iconName,
  iconAlign,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {iconName && iconAlign !== 'right' && (
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} size="1x" />
      )}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {iconName && iconAlign === 'right' && (
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} size="1x" />
      )}
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

export default Input;
