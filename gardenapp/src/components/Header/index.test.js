import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from './index';

test('renders Header component with correct links and text', () => {
  render( 
  <BrowserRouter>
    <Header />
  </BrowserRouter>);

  const homeLink = screen.getByRole('link', { name: /Home/i });
  const suggestionsLink = screen.getByRole('link', { name: /GardeningSuggestions/i });
  const wizardLink = screen.getByRole('link', { name: /GardeningWizard/i });
  const headerText = screen.getByRole('heading', { name: /aussie garden wizard/i });

  expect(homeLink).toBeInTheDocument();
  expect(suggestionsLink).toBeInTheDocument();
  expect(wizardLink).toBeInTheDocument();
  expect(headerText).toBeInTheDocument();

  fireEvent.click(homeLink);
  expect(screen.getByText('Welcome!!')).toBeInTheDocument();

  fireEvent.click(suggestionsLink);
  expect(screen.getByText('Enter a Location')).toBeInTheDocument();

  fireEvent.click(wizardLink);
  expect(screen.getByText('Plant Finder')).toBeInTheDocument();

  fireEvent.click(wizardLink);
  expect(screen.getByText('Articles')).toBeInTheDocument();
});

