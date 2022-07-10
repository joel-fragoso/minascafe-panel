import {
  FC,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface IOption {
  value: string | number;
  label: string;
  iconName?: IconName;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<IOption>;
  containerStyle?: object;
}

const Select: FC<ISelectProps> = ({
  name,
  options,
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
      {iconName && (
        <FontAwesomeIcon
          icon={{
            prefix: 'fas',
            iconName,
          }}
          fixedWidth
          size="1x"
        />
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

export default Select;
