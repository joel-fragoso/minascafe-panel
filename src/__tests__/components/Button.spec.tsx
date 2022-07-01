import { render, screen } from 'test-utils';
import Button from '../../components/Button';

test('renders Entrar button', () => {
  render(<Button type="submit">Entrar</Button>);
  const buttonElement = screen.getByText(/Entrar/i);
  expect(buttonElement).toBeInTheDocument();
});
