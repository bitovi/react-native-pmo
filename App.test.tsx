import React from 'react';
import { render, screen } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  it('renders', () => {
    render(<App />);
    expect(screen.getByText(/place my order/i)).toBeOnTheScreen();
  });
});
