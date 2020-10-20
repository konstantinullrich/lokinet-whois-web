import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Searchbar from './Searchbar';

test('Renders search bar and loki logo', () => {
  const onSearch = jest.fn();
  const { getByPlaceholderText, getByAltText } = render(<Searchbar onSearch={onSearch} error={false}/>);
  const inputElement = getByPlaceholderText(/Enter a .loki Domain/i);
  const lokiLogoElement = getByAltText(/loki-logo/i);
  expect(inputElement).toBeInTheDocument();
  expect(lokiLogoElement).toBeVisible();
});

test('Calls onSearch and onInput', () => {
  const onSearch = jest.fn();
  const onInput = jest.fn();
  const { getByPlaceholderText } = render(<Searchbar onSearch={onSearch} onInput={onInput} error={false}/>);
  const inputElement = getByPlaceholderText(/Enter a .loki Domain/i);
  fireEvent.change(inputElement, {
    target: { value: 'domain.loki' }
  });
  fireEvent.submit(inputElement)

  expect(onSearch).toBeCalled();
  expect(onInput).toBeCalled();
});
