import { useField } from '@unform/core';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import { Container, Error } from './styles';

import perfilImg from '../../assets/img/perfil.jpg';

interface Props {
  name: string;
  defaultPreview?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput = ({ name, defaultPreview, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
    }

    if (file && !file.type.startsWith('image/')) {
      setPreview(null);
      return;
    }

    if (file) {
      const previewURL = URL.createObjectURL(file);

      setPreview(previewURL);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        const clearRef = ref;
        clearRef.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });

    setPreview(defaultPreview);
  }, [defaultPreview, fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <img src={preview || perfilImg} alt="Preview" />
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
      />
      <Icon iconName="camera" />
      {error && (
        <Error title={error}>
          <Icon iconName="circle-exclamation" size="1x" />
        </Error>
      )}
    </Container>
  );
};

export default ImageInput;
