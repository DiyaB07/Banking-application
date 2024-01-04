
import { SET_BALANCE,SET_DETAILS, SUB_BALANCE ,POST_TRANSACTION,DEBIT_BALANCE} from "./constant/constant";


type props={
    state:{}
    action:{}
}

 export interface IProduct{
    id:string,
            Date:string,
            Name:string,
            CreditOrDebit:string,
             Amount:number
}
export type ProductState={
    data:IProduct[],
    accountbalance:number,
    balance:number
}

export type ProductAction={
    type:string,
    data:IProduct;
    balance:number;
    amount:number;
};
const localbalance = localStorage.getItem('balance');

const initialState:ProductState={
  data:[],
  balance:localbalance ? parseInt(JSON.parse(localbalance)) : 0,
  accountbalance:0,
}

export type DispatchTypes = (args:ProductAction) => ProductAction
const Reducer=(state:ProductState=initialState,action:ProductAction):ProductState =>{
    switch(action.type){
   case SET_DETAILS:
   
    return{
        ...state,
        data:state.data.concat(action.data)
    
    };
    case SET_BALANCE: 
        return{
            ...state,
            balance: action.balance
        }
    
        case SUB_BALANCE:
            const newBalance = state.balance - action.amount >= 0 
            ? state.balance - action.amount
            : 0;
            localStorage.setItem('balance', JSON.stringify(newBalance));
            return { 
                ...state,
                balance: newBalance,
            }
            case DEBIT_BALANCE:
                const newDebitBalance = state.balance + action.amount;
            localStorage.setItem('balance', JSON.stringify(newDebitBalance));
            
           return { 
               ...state,
               balance: newDebitBalance,
  }
//   case POST_TRANSACTION:
//       return {
//         ...state,
//         data: state.data.concat(action.data),
//       }

        
   
   default:
    return state;
   
}
};
export {Reducer};