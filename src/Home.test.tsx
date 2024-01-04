import { render, screen ,fireEvent} from '@testing-library/react';
import { BrowserRouter as  Router} from 'react-router-dom'; 
import Home from './Home'; 
import { Provider } from 'react-redux';
import store from './redux/store/reducer/action/store';
import { SendMoney } from './SendMoney';
import { Debitmoney } from './debit';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore();

const mockStore = createMockStore({
  data:[
    {
      id: "1",
      Date: "2022-05-01",
      Name: "Test payee",
      CreditOrDebit: "Credit",
      Amount: 1000,
    },
  ],
  balance: 10000,
  accountbalance: 0,
})
describe('Home component', () => {
  it('renders Home component with mock data', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Your Transactions")).toBeInTheDocument();
    expect(screen.getByText(/Name:*/i)).toBeInTheDocument();
    expect(screen.getByText("2022-05-01")).toBeInTheDocument();
    screen.getAllByText(/[CreditDebit]/).forEach(element => { 
      expect(element).toBeInTheDocument();
  })
  });
  
  it('should render send and deposit money buttons', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Send Money")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Send Money/i })).toBeInTheDocument();
    expect(screen.getByText("Deposit Money")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Deposit Money/i })).toBeInTheDocument();
  });

  
});
