import { useField } from '@unform/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  MenuOption,
  Select as ReactSelect,
  SelectProps,
  SelectRef,
} from 'react-functional-select';
import Icon from '../Icon';
import { Container, Error, SelectTheme } from './styles';

interface ISelectProps extends SelectProps {
  name: string;
}

const Select: FC<ISelectProps> = ({ name, options, isDisabled, ...rest }) => {
  const selectRef = useRef<SelectRef | null>(null);
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);

  const { fieldName, error, registerField } = useField(name);

  const onOptionChange = useCallback(
    (menuOption: MenuOption | null): void => setSelectedOption(menuOption),
    [],
  );
  const getFilterOptionString = useCallback(
    (menuOption: MenuOption): string => menuOption.data.data,
    [],
  );
  const getOptionLabel = useCallback(
    (menuOption: MenuOption) => menuOption.label,
    [],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: () => {
        return selectedOption?.value;
      },
      setValue: (ref, value) => {
        ref?.setValue(options?.find(option => option.value === value));
      },
      clearValue: ref => {
        ref?.clearValue();
      },
    });
  }, [fieldName, options, registerField, selectedOption]);

  return (
    <Container isDisabled={isDisabled}>
      <ReactSelect
        onOptionChange={onOptionChange}
        themeConfig={SelectTheme}
        isInvalid={!!error}
        getFilterOptionString={getFilterOptionString}
        getOptionLabel={getOptionLabel}
        options={options}
        isDisabled={isDisabled}
        ref={selectRef}
        {...rest}
      />
      {error && (
        <Error title={error} clearable={!selectedOption || !rest.isClearable}>
          <Icon iconName="circle-exclamation" />
        </Error>
      )}
    </Container>
  );
};

export default Select;
