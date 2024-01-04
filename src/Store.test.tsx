import store from '../src/redux/store/reducer/action/store';
import { showdata, setBalance, subBalance } from '../src/redux/store/reducer/action/Action'; 

describe("Store", () => {
  
  const initialState = {
    data:[],
    balance:0,
    accountbalance:0,
  };

  beforeEach(() => {
    // Cleaning up the store to its initial state before each test case.
    store.dispatch({type: 'DEBIT_BALANCE', amount: 0})
  });

  it("store should be initialized with the correct initial state", () => {
    const currentState = store.getState();
    expect(currentState).toEqual(initialState);
  });

  it("should update balance with setBalance action", () => {
    store.dispatch(setBalance(100));
    const currentState = store.getState();
    expect(currentState.balance).toEqual(100);
  });

  it("should subtract balance with subBalance action", () => {
    store.dispatch(setBalance(100)); 
    store.dispatch(subBalance(20)); 
    const currentState = store.getState();
    expect(currentState.balance).toEqual(80);
  });

  // ... add more tests for other action creators and how they update the state.
});