import React from 'react';
import configureStore from 'redux-mock-store'; 
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/redux/store/reducer/action/store'
import { cleanup,render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SendMoney } from './SendMoney';
import { MemoryRouter } from 'react-router-dom'; 
import Payee from "./payeelist.json"
import * as actionCreators from '../src/redux/store/reducer/action/Action';

afterEach(cleanup);
const mockStore = configureStore([]);
test('renders SendMoney component', () => {
    
  render(
    <Provider store={store}>
        <MemoryRouter>
      <SendMoney />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Send money to the selected payee')).toBeInTheDocument();
});
describe('SendMoney', () => {
    let store:any;
  
    beforeEach(() => {
      // Creates the store with any initial state or middleware needed  
      store = mockStore({
        balance: 0,
        accountbalance: 0,
        data: [],
      });
    });

test('handles amount input change', async () => {

    const { getByText, getByPlaceholderText, getByRole } =render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <SendMoney />
        </MemoryRouter>
      </Provider>
    );
    const validPayeeName = Payee.payeeName[0].Name;
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: validPayeeName } });
    
    const inputField = await screen.findByPlaceholderText('enter the amount') as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: '1000' } });
    expect(inputField.value).toBe('1000');
    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    await new Promise(resolve => setTimeout(resolve, 500));
    const actions = store.getActions();
    const expectedActions = [
        { type: "SUB_BALANCE", amount: 1000 },
        { type: "POST_REQUEST", data: { ...Payee.payeeName[0], Amount: 1000 } },
      ];  // adjust based on your actual action
      expect(actions).toEqual(expectedActions);
  });
})
