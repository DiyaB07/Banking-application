import { Reducer ,ProductAction,ProductState} from './redux/store/reducer/action/reducer';
import * as types from '../src/redux/store/reducer/action/constant/constant';
import { IProduct } from './redux/store/reducer/action/reducer';
describe('Reducer', () => {
  let initialState: ProductState;
  beforeEach(() => {
   initialState = {
    data:[],
    balance:0,
    accountbalance:0,
  };
})
  const dummyAction = {
    type: '',
    data: {
      id: '',
      Date: '',
      Name: '',
      CreditOrDebit: '',
      Amount: 0,
    },
    balance: 0,
    amount: 0,
  };

  it("should return the initial state", () => {
    expect(Reducer(undefined, dummyAction)).toEqual(initialState);
  });


  it("should handle SET_BALANCE", () => {
    const balance = 100;
    const expectedState = { 
      data: [], 
      balance: 100,
      accountbalance: 0,
     };
     const setBalanceAction: ProductAction = {
        type: types.SET_BALANCE,
        data: dummyAction.data,
        balance,
        amount: dummyAction.amount,
      };
    expect(
      Reducer(initialState, setBalanceAction)
    ).toEqual(expectedState);
  });

  it("should handle SUB_BALANCE", () => {
    const state = { 
      data: [], 
      balance: 100,
      accountbalance: 0,
     };
    const amount = 50;
    const expectedState = { 
      data: [], 
      balance: 50, 
      accountbalance: 0,
     };
     
     const subBalanceAction: ProductAction = {
        type: types.SUB_BALANCE,
        data: dummyAction.data,
        balance: state.balance,
        amount,
      };
      expect(Reducer(state, subBalanceAction)).toEqual(expectedState);
  });
  
  it("should handle SET_DETAILS", () => {
    const setDetailsData: IProduct = {
      id: '1',
      Date: '22.01.2023',
      Name: 'Test Name',
      CreditOrDebit: 'Credit',
      Amount: 500,
    };
    const action: ProductAction = {
      type: types.SET_DETAILS,
      data: setDetailsData,
      balance: 0,
      amount: 0
    };
    const expectedState = { 
      ...initialState,
      data: [setDetailsData]
    };

    expect(Reducer(initialState, action)).toEqual(expectedState);
  });
  it("should handle DEBIT_BALANCE", () => {
    const debitAmount = 100;
    const expectedState = { 
      ...initialState,
      balance: initialState.balance + debitAmount,
    };
     
    const debitBalanceAction: ProductAction = {
      type: types.DEBIT_BALANCE,
      data: {} as IProduct,
      balance: initialState.balance,
      amount: debitAmount
    };
    
    expect(Reducer(initialState, debitBalanceAction)).toEqual(expectedState);
  });
  

  
});