import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import React from 'react';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('increment counter', () => {
  render(<App />);

   const btnIncrement = screen.getByTestId("btn");
   fireEvent.click(btnIncrement);

   expect(screen.getByText("Here is a simple Hello World")).toBeInTheDocument();
});