import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Debitmoney } from './debit';
import Debitlist from './debit.json';
import store from '../src/redux/store/reducer/action/store'
afterEach(cleanup); // Clean up after each test

const mockStore = configureStore([]);
test('renders Debitmoney component', () => {
    
    render(
      <Provider store={store}>
          <MemoryRouter>
        <Debitmoney/>
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByText('Welcome to debit money page')).toBeInTheDocument();
});

describe('Debitmoney Component', () => {
  let store: any;

  beforeEach(() => {
    // Initialize the store for every test
    store = mockStore({
      balance: 0,
      accountbalance: 0,
      data: [],
    });
  });


  test('handles amount input change', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Debitmoney />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome to debit money page')).toBeInTheDocument();

    const validDebitType = Debitlist.debitType[0].Type;
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: validDebitType } });

    const inputField = await screen.findByPlaceholderText('Enter amount') as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: '1000' } });
    expect(inputField.value).toBe('1000');

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);

    const actions = store.getActions();
    const expectedActions = [
      { type: "DEBIT_BALANCE", amount: 1000 },
      { type: "POST_REQUEST", data: { ...Debitlist.debitType[0], Amount: 1000 } },
    ];
    expect(actions).toEqual(expect.arrayContaining(expectedActions));
  });
});