import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';

describe('Componente Button', () => {
  it('renderiza Entrar button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button type="submit" disabled={false} loading={false}>
          Entrar
        </Button>
      </ThemeProvider>,
    );
    const buttonElement = screen.getByText(/Entrar/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('verifica se componente Loading renderiza', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button type="submit" disabled loading>
          Entrar
        </Button>
      </ThemeProvider>,
    );
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).not.toHaveTextContent(/Entrar/i);
    expect(within(buttonElement).getAllByRole('generic')).toHaveStyle;
  });
});
