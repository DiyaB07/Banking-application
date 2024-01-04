import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import Debitlist from "./debit.json";
import { Link } from 'react-router-dom';
import { debitBalance, postTransaction } from './redux/store/reducer/action/Action';
import { useDispatch } from 'react-redux';
type Props = {};
type Product={
    id: string;
    Name: string;
    Type:string;
    Date: string;
    CreditOrDebit: string;
    Amount: any;
    }

const Debitmoney = (props : Props) => {
    const dispatch=useDispatch(); 
    const[chooseOption,setChooseOption]=useState<string>('');
    const[debitAmount,setDebitamount]=useState<number>(0);

    const handleSelectChange=(e:ChangeEvent<HTMLSelectElement>)=>{
        e.preventDefault();
        setChooseOption(e.target.value)
        
        
    };
    const handleDebitAmount = (e:ChangeEvent<HTMLInputElement>)=>{
        let amount = parseInt(e.target.value);
        setDebitamount(parseInt(e.target.value))
        // dispatch(debitBalance(amount))
    
    }
    const postDebitdata =  (name:Product) =>{
       
        const transactionData = {
            ...name,
            Amount: debitAmount,
          };
          dispatch(postTransaction(transactionData)); 
          dispatch(debitBalance(debitAmount));
    }
    return (
    <div>
        <h1>Welcome to debit money page</h1>
        <div className='col-md-10 mt-3 btn btn-info dropdown-toggle' >
        
    <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
    <option>DEPOSITE TYPE</option>
    {
       Debitlist.debitType.map((debit)=>
       <option key={debit.Type} value={debit.Type}>{debit.Type}</option>
       )
    }
    </select>
    {
        chooseOption &&
        (
            <div>
                <form>
                <div className="mb-3">
<label  className="form-label">Amount</label>
<input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handleDebitAmount} placeholder='Enter amount'/>
<div id="emailHelp" className="form-text">Share the amount you want to debit</div>
</div>

<Link to="/">
    <button type="submit" className="btn btn-primary" onClick={()=>{
        const selectDebit = Debitlist.debitType.find((name)=> name.Type === chooseOption);
        selectDebit && postDebitdata(selectDebit);
    }}
>Submit</button>
    </Link>

                </form>
            </div>
        )

    }

    </div>

    </div>
    )
    
};

export { Debitmoney };