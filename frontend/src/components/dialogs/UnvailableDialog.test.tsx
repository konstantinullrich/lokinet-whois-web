import React from 'react';
import { render } from '@testing-library/react';
import UnvailableDialog from './UnvailableDialog';

const query = 'domain.loki';
const expirationHeight = 911915;
const nameHash = 'Q9NPNHTSWUJhfywqLKoiqnbPaF+Zw3KmRvDLrO6Ysz0=';
const owner = 'L8eYrV5mt364qm64Lp2n1hGo883m4rqLS45H111FVvqbLAGTSbfFL9RGWGvXFR9Qir6fHWJoBgMNNCT9CUGSECuAFAmMg83';
const transactionId = '6d2cbe1a2831cc353194bd2978622b02d16533cff1e4d7e113e7eb88b573f09b';
const type = 2;
const updateHeight = 646955;
const currentAddress = 'ftjgbpfjwajsudpw7x9yua3h8fnbp3f9cqjbug5gc5wzzcoxeody.loki';

test('Renders Dialog', () => {
  const onClose = jest.fn();

  const { getByLabelText, getByText } = render(
    <UnvailableDialog
      query={query}
      expirationHeight={expirationHeight}
      nameHash={nameHash}
      owner={owner}
      txId={transactionId}
      type={type}
      updateHeight={updateHeight}
      currentAddress={currentAddress} 
      onClose={onClose} 
      open />
  );

  const isAlreadyRegisteredElement = getByText(/is already registered/i);
  const expirationHeightElement = getByLabelText(/Expiration Height/i);
  const nameHashElement = getByLabelText(/Name Hash/i);
  const ownerElement = getByLabelText(/Owner/i);
  const transactionIdElement = getByLabelText(/Transaction Id/i);
  const typeElement = getByLabelText(/Type/i);
  const updateHeightElement = getByLabelText(/Update Height/i);
  const currentAddressElement = getByLabelText(/Current Address/i);
  const closeButtonElement = getByText(/Close/i);

  expect(expirationHeightElement).toBeInTheDocument();
  expect(expirationHeightElement.getAttribute('value')).toBe(expirationHeight.toString());

  expect(nameHashElement).toBeInTheDocument();
  expect(nameHashElement.getAttribute('value')).toBe(nameHash);

  expect(ownerElement).toBeInTheDocument();
  expect(ownerElement.getAttribute('value')).toBe(owner);

  expect(transactionIdElement).toBeInTheDocument();
  expect(transactionIdElement.getAttribute('value')).toBe(transactionId);

  expect(typeElement).toBeInTheDocument();
  expect(typeElement.getAttribute('value')).toBe(type.toString());

  expect(updateHeightElement).toBeInTheDocument();
  expect(updateHeightElement.getAttribute('value')).toBe(updateHeight.toString());

  expect(currentAddressElement).toBeInTheDocument();
  expect(currentAddressElement.getAttribute('value')).toBe(currentAddress);

  expect(isAlreadyRegisteredElement).toBeInTheDocument();
  expect(isAlreadyRegisteredElement.innerHTML).toBe(`${query} is already registered`)

  expect(closeButtonElement).toBeVisible();
});

test('Calls onClose', () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <UnvailableDialog
      query={query}
      expirationHeight={expirationHeight}
      nameHash={nameHash}
      owner={owner}
      txId={transactionId}
      type={type}
      updateHeight={updateHeight}
      currentAddress={currentAddress} 
      onClose={onClose} 
      open />
  );
  const closeButtonElement = getByText(/Close/i);
  closeButtonElement.click();

  expect(onClose).toBeCalled();
});







