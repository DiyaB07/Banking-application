import { takeEvery,put,call } from "redux-saga/effects";
import { POST_REQUEST,POST_REQUEST_SUCCESS,POST_REQUEST_FAILURE } from "./store/reducer/action/constant/constant";
import { postTransaction,postRequestSuccess,postRequestFail } from "./store/reducer/action/Action";
import { IProduct } from "./store/reducer/action/reducer";
const postApi = async ( transactionData:IProduct) =>{
    try{
        const currentDate = new Date().toISOString();
    const response = await fetch("http://localhost:3500/bankdetails", {
      method: "POST",
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        ...transactionData,
        Date: currentDate,
        CreditOrDebit: transactionData.CreditOrDebit.toLowerCase(),
      }),
    });
    return response.ok;
  } catch (error) {
    throw error;
    }

};
 export function* postTransactionSaga(action:any): Generator<any,void,any>{
    try
    {
        const TransactionSuccessful= yield call (postApi,action.data);
        if(TransactionSuccessful){
            yield put(postRequestSuccess())
        }
        else{
            yield put(postRequestFail())
        }
    }
    catch (error) {
        console.error('Error posting transaction:', error);
        yield put(postRequestFail());
        alert("Transaction failed");
      }
}

function* transactionData(): Generator<any,void,any>{
    yield takeEvery(POST_REQUEST,postTransactionSaga);
}
export default transactionData;
 