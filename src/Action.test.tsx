import * as actions from "../src/redux/store/reducer/action/Action"
import * as types from "../src/redux/store/reducer/action/constant/constant";

describe("Action Creators", () => {
  it("should set balance", () => {
    const balance = 1000;
    const expectedAction = { type: types.SET_BALANCE, balance };
    const result = actions.setBalance(balance);

    expect(result).toEqual(expectedAction);
  });

  it("should subtract balance", () => {
    const amount = 100;
    const expectedAction = { type: types.SUB_BALANCE, amount };
    const result = actions.subBalance(amount);

    expect(result).toEqual(expectedAction);
  });

  it("should debit balance", () => {
    const amount = 50;
    const expectedAction = { type: types.DEBIT_BALANCE, amount };
    const result = actions.debitBalance(amount);

    expect(result).toEqual(expectedAction);
  });

  it("should show data", () => {
    const expectedAction = { type: types.SHOW_DATA };
    const result = actions.showdata();

    expect(result).toEqual(expectedAction);
  });

  it("should receive money", () => {
    const data = {
        id: "1",
        Date: "12-12-2021",
        Name: "Test",
        CreditOrDebit: "Debit",
        Amount: 100,
      };
    const expectedAction = { type: types.REC_MONEY, data };
    const result = actions.receiveMoney(data);

    expect(result).toEqual(expectedAction);
  });

  it("should post request", () => {
    const data = {
      id: "1",
      Date: "12-12-2021",
      Name: "Test",
      CreditOrDebit: "Debit",
      Amount: 100,
    };
    const expectedAction = { type: types.POST_REQUEST, data };
    const result = actions.postTransaction(data);

    expect(result).toEqual(expectedAction);
  });

  it("should post request successfully", () => {
    const expectedAction = { type: types.POST_REQUEST_SUCCESS };
    const result = actions.postRequestSuccess();

    expect(result).toEqual(expectedAction);
  });

  it("should fail post request", () => {
    const expectedAction = { type: types.POST_REQUEST_FAILURE };
    const result = actions.postRequestFail();

    expect(result).toEqual(expectedAction);
  });
});