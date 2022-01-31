import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import FencyButton from './FencyButton';

test('buton render without crashing', () => {
    const { getByTestId } = render(<FencyButton label='Click Me' isDisabled={false} disabledText='waiting...' />);
    expect(screen.getByTestId("buttonid")).toHaveAttribute("value", "Click Me");
});

test('button render correctly', () => {
    render(<FencyButton label='Click Me' isDisabled={false} disabledText='waiting...' />);
    expect(screen.getByTestId("buttonid")).toHaveAttribute("value", "Click Me");

});
