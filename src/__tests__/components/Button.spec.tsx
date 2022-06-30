import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';

test('renders Entrar button', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button type="submit">Entrar</Button>
    </ThemeProvider>,
  );
  const buttonElement = screen.getByText(/Entrar/i);
  expect(buttonElement).toBeInTheDocument();
});
