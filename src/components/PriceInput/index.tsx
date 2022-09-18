import {
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface IPriceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  defaultPriceValue: string;
}

const PriceInput: FC<IPriceInputProps> = ({
  name,
  defaultPriceValue,
  ...rest
}) => {
  const [priceValue, setPriceValue] = useState('');
  const [backspace, setBackspace] = useState(false);
  const [containerStyle, setContainerStyle] = useState({});

  const theme = useTheme();

  const moveNumbers = (num: number, backward: boolean) => {
    const arr = Array.from(num.toFixed(3).split('.'), string =>
      Array.from(string),
    );

    if (backward) {
      arr[1].unshift(arr[0].pop() as string);
    } else {
      arr[0].push(arr[1].shift() as string);
    }

    return arr;
  };

  const formatBRL = (num: number) => {
    const value = num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return value;
  };

  useEffect(() => {
    if (defaultPriceValue) {
      setPriceValue(defaultPriceValue);
    }
  }, [defaultPriceValue]);

  const handleFocus = (element: HTMLInputElement) => {
    setContainerStyle({
      color: theme.pallete.primary.main,
      borderColor: theme.pallete.primary.main,
    });

    if (!element.value) {
      setPriceValue('0,00');
    }
  };

  const handleKeyDown = ({
    key,
    currentTarget: element,
  }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace') {
      setBackspace(true);
    }

    element.setSelectionRange(element.value.length, element.value.length);
  };

  const handleMouseDown = (element: HTMLInputElement) => {
    element.setSelectionRange(element.value.length, element.value.length);
  };

  const handleBlur = (element: HTMLInputElement) => {
    if (element.placeholder === element.value) {
      setPriceValue('');
    }

    setContainerStyle({});
  };

  const handleInputMask = (element: HTMLInputElement) => {
    const [i, j] = [element.selectionStart, element.selectionEnd];
    let values: string[][] = [[]];

    if (backspace) {
      const splitValues = element.value.split('');
      splitValues.splice(i as number, j as number);
      setPriceValue(splitValues.join(''));
    }

    values = Array.from(element.value.split(','), e => Array.from(e));

    if (values.length <= 1) {
      setPriceValue('0,00');
      element.setSelectionRange(2, 2);
      return;
    }

    if (element.value === priceValue && element.value !== element.placeholder) {
      return;
    }

    if (!element.value.match(/^(\d*[.])*?\d+[,]\d+$/g)) {
      return;
    }

    values = moveNumbers(
      parseFloat(values.map(v => v.join('').replaceAll('.', '')).join('.')),
      backspace,
    );

    setBackspace(false);

    if (values[0].filter(v => v !== '.').length > 8) {
      return;
    }

    setPriceValue(
      formatBRL(
        parseFloat(values.map(v => v.join('').replaceAll('.', '')).join('.')),
      ),
    );
  };

  return (
    <Container
      {...rest}
      containerStyle={containerStyle}
      name={name}
      iconName="brazilian-real-sign"
      iconAlign="left"
      type="text"
      placeholder="0,00"
      value={priceValue}
      onChange={event => handleInputMask(event.target)}
      onFocus={event => handleFocus(event.target)}
      onBlur={event => handleBlur(event.currentTarget)}
      onMouseDown={event => handleMouseDown(event.currentTarget)}
      onKeyDown={event => handleKeyDown(event)}
    />
  );
};

export default PriceInput;
