import { REC_MONEY,  SET_BALANCE, SHOW_DATA,SUB_BALANCE ,DEBIT_BALANCE, POST_REQUEST, POST_REQUEST_SUCCESS, POST_REQUEST_FAILURE} from "./constant/constant";
import {IProduct} from "./reducer"
 type props = {
    data:{}
 }
export const showdata=()=>{
  return{
    type:SHOW_DATA,
    
  }
}
export const receiveMoney=(data:IProduct)=>{
    return{
      type:REC_MONEY,
      data,
    }
  }
  export const setBalance = (balance:number)=>({
    type: SET_BALANCE,
    balance
  });
  export const subBalance = (amount:number)=>({
    type: SUB_BALANCE,
    amount
  })
  export const debitBalance = (amount: number) => ({
    type: DEBIT_BALANCE,
    amount,
  });
  export const postTransaction=(data:IProduct) => ({
    type: POST_REQUEST,
    data,
  })
  
  export const postRequestSuccess=()=>({
    type: POST_REQUEST_SUCCESS
  })
  
  export const postRequestFail=()=>({
    type: POST_REQUEST_FAILURE
  }) 
  