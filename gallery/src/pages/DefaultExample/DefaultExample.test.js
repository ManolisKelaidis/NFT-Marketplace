import { render, screen } from '@testing-library/react';
import DefaultExample from './DefaultExample';

test('renders learn react link', () => {
  render(<DefaultExample />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
