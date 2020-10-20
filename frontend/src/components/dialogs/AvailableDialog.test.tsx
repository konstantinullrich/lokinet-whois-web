import React from 'react';
import { render } from '@testing-library/react';
import AvailableDialog from './AvailableDialog';

const query = 'domain.loki';

test('Renders Dialog', () => {
  const onClose = jest.fn();

  const { getByText } = render(<AvailableDialog query={query} onClose={onClose} open />);

  const isAvailableElement = getByText(/is available/i);
  const closeButtonElement = getByText(/Close/i);

  expect(isAvailableElement).toBeInTheDocument();
  expect(isAvailableElement.innerHTML).toBe(`${query} is available`)
  expect(closeButtonElement).toBeVisible();
});

test('Calls onClose', () => {
  const onClose = jest.fn();

  const { getByText } = render(<AvailableDialog query={query} onClose={onClose} open />);

  const closeButtonElement = getByText(/Close/i);
  closeButtonElement.click();

  expect(onClose).toBeCalled();
});
