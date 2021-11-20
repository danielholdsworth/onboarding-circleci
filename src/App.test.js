import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import React from 'react';

test('Should display text', () => {
  render(<App />);

   const btnIncrement = screen.getByTestId("btn");
   fireEvent.click(btnIncrement);

   expect(screen.getByText("Here is a simple Hello World React App Deployed by CircleCI")).toBeInTheDocument();
});