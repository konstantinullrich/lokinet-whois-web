import React from 'react';
import { render } from '@testing-library/react';
import InfoDialog from './InfoDialog';

test('Renders Dialog', () => {
  const onClose = jest.fn();

  const lokiAddress = 'L8eYrV5mt364qm64Lp2n1hGo883m4rqLS45H111FVvqbLAGTSbfFL9RGWGvXFR9Qir6fHWJoBgMNNCT9CUGSECuAFAmMg83';

  const { getByLabelText, getByText } = render(<InfoDialog onClose={onClose} open />);
  const lokiAddressElement = getByLabelText(/Loki Address/i);
  const closeButtonElement = getByText(/Close/i);

  expect(lokiAddressElement).toBeInTheDocument();
  expect(lokiAddressElement.getAttribute('value')).toBe(lokiAddress)
  expect(closeButtonElement).toBeVisible();
});

test('Calls onClose', () => {
  const onClose = jest.fn();

  const { getByText } = render(<InfoDialog onClose={onClose} open />);

  const closeButtonElement = getByText(/Close/i);
  closeButtonElement.click();

  expect(onClose).toBeCalled();
});
