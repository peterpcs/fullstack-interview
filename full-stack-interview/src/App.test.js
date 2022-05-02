import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fullstack interview app', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Robots Collection/i)
  expect(linkElement).toBeInTheDocument();
});
