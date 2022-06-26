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
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  iconName?: IconName;
}

const Input: FC<InputProps> = ({
  name,
  containerStyle = {},
  iconName,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // const { fieldName, defaultValue, error, registerField } = useField(name);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: inputRef.current,
  //     path: 'value',
  //   });
  // }, [fieldName, registerField]);

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
      isErrored={false} // {!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {iconName && (
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} size="1x" />
      )}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
