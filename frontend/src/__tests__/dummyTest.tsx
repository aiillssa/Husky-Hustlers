// SumComponent.test.js
import { render, screen } from '@testing-library/react';
import DummyComponent from '../components/dummyTestComponent';

test('displays 1 + 1 = 2', () => {
  // Render the component
  render(<DummyComponent />);

  // Find the element that displays the result
  const resultElement = screen.getByText('2');

  // Assert that the result is correct
  expect(resultElement).toBeInTheDocument();
});
