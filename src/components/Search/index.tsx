import { FC, InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import { DebounceInput, DebounceInputProps } from 'react-debounce-input';
import Icon from '../Icon';
import { Container } from './styles';

interface ISearchProps
  extends DebounceInputProps<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
  > {
  defaultHide?: boolean;
}

const Search: FC<ISearchProps> = ({ defaultHide, ...props }: ISearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isHiding, setIsHiding] = useState<boolean>(defaultHide || true);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!searchRef.current?.value);
  }, []);

  const handleButton = () => {
    searchRef.current?.blur();

    if (isHiding) {
      searchRef.current?.focus();
    }

    setIsHiding(!isHiding);
  };

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isHiding={isHiding}>
      <DebounceInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        inputRef={searchRef}
        {...props}
      />
      <button
        type="button"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={() => handleButton()}
      >
        <Icon iconName="search" />
      </button>
    </Container>
  );
};

export default Search;
