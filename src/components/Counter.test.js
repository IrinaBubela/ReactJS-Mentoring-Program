import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  it('Test that component renders initial value provided in props(1)', () => {
    const initialValue = 5; 
    const renderResult = render(<Counter initialValue={initialValue} />);
    const countElement = renderResult.getByText(`Count: ${initialValue}`);
    
    expect(countElement).toBeInTheDocument();
  });

  it('Test that a click event on "decrement" button decrements the displayed value(2)', () => {
    const initialValue = 5; 
    const renderResult =  render(React.createElement(Counter, { initialValue }));
    
    const decrementButton = renderResult.getByText('Decrement');
    const textElement = renderResult.getByTestId('count-display');

    fireEvent.click(decrementButton);
    
    expect(textElement.textContent).toBe(`Count: ${initialValue - 1}`);
  });

  it('Test that a click event on "increment" button increments the displayed value(3)', () => {
    const initialValue = 3; 
    const renderResult =  render(React.createElement(Counter, { initialValue }));
    
    const incrementButton = renderResult.getByText('Increment');
    const textElement = renderResult.getByTestId('count-display');

    fireEvent.click(incrementButton);
    
    expect(textElement.textContent).toBe(`Count: 4`);
  });
});