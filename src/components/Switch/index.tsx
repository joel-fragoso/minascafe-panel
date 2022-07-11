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
  label: string;
  containerStyle?: object;
}

const Switch: FC<ICheckboxProps> = ({
  name,
  label,
  containerStyle = {},
  ...rest
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(rest.defaultChecked || false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  const handleChecked = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

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
      isChecked={isChecked}
      data-testid="switch-container"
    >
      <label htmlFor={name}>
        {label}
        <div>
          <Icon iconName={isChecked ? 'toggle-on' : 'toggle-off'} />
        </div>
      </label>
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={handleChecked}
        onFocus={handleCheckboxFocus}
        onBlur={handleCheckboxBlur}
        defaultValue={defaultValue}
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

export default Switch;
