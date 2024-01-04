import React, { ChangeEvent } from 'react';
import { useState,useEffect } from 'react';
import Payee from "./payeelist.json";
import { Link } from 'react-router-dom';
import { IProduct } from './redux/store/reducer/action/reducer';
import { postTransaction, subBalance } from './redux/store/reducer/action/Action';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
type Props = {

};

type Product={
id: string;
Name: string;
Date: string;
CreditOrDebit: string;
Amount: any;
}


const SendMoney = (props : Props) => {
   
    const navigate=useNavigate();
    const [ showModal, setShowModal ] = useState(false);

    const dispatch=useDispatch(); 
const[selectOption,setSelectOption]=useState<string>('');
const[sendAmount,setAmount]=useState<number>(0);


const handleSelectChange=(e:ChangeEvent<HTMLSelectElement>)=>{
    e.preventDefault();
    setSelectOption(e.target.value)
    
    
};
const handleAmountChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const amount = parseInt(e.target.value);
    setAmount(parseInt(e.target.value))
    dispatch(subBalance(amount)); 
};
const handleSendMoney = (name:Product)=>{
    
    const transactionData = {
        ...name,
        
        Amount: sendAmount,
    };
    dispatch(postTransaction(transactionData));
    navigate("/", { state: { transactionSuccess: true } }); 
    
    
}



return (<div>
    <h1>Send money to the selected payee</h1>
    <div className='container'>
        
    <select className="form-select" aria-label="Default select example" onChange={handleSelectChange}>
    <option>PAYEE LIST</option>
    {
        Payee.payeeName.map((names)=>
        <option key={names.Name} value={names.Name}>{names.Name}</option>
        )
    }
        


</select>

{
selectOption &&(
    <div>
        <form >
<div className="mb-3">
<label  className="form-label">Amount</label>
<input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleAmountChange} placeholder='enter the amount'/>
<div id="emailHelp" className="form-text">Share the amount you want to transact</div>
</div>


    <button type="submit" className="btn btn-primary" onClick={() => {
  const selectedPayee = Payee.payeeName.find((name) => name.Name === selectOption);
  selectedPayee && handleSendMoney(selectedPayee);
  console.log("inside it")
}}>Submit</button>
   
   
    

</form>
    </div>
)
}
</div>
</div>);
};

export { SendMoney };