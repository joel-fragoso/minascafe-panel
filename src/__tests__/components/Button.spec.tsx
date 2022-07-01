import { render, screen, within } from 'test-utils';
import Button from '../../components/Button';

describe('Componente Button', () => {
  it('renderiza Entrar button', () => {
    render(<Button type="submit">Entrar</Button>);
    const buttonElement = screen.getByText(/Entrar/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('verifica se componente Loading renderiza', () => {
    render(
      <Button type="submit" disabled loading>
        Entrar
      </Button>,
    );
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).not.toHaveTextContent(/Entrar/i);
    expect(within(buttonElement).getAllByRole('generic')).toHaveStyle;
  });
});
