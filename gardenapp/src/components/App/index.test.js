import { screen, render } from '@testing-library/react';
import App from './index';
import '@testing-library/jest-dom/extend-expect';


test('renders App component with Aussie Garden Wizard text', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: 'Aussie Garden Wizard' });
  expect(heading).toBeInTheDocument();


  });





