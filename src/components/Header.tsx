import React from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '../redux/store/reducer/action/reducer';

import "./Header.css"
type Props = {};
interface RootState {
    data: Array<IProduct>;
    accountbalance: number;
    balance: number;
  }

const Header = (props : Props) => {
    
    
    
    const balance = useSelector((state: RootState) => state.balance);
    
    
    return <div>
        
        <nav className="navbar navbar-expand-lg navbar-info bg-info">
            <img  className="image"src='https://cdn.icon-icons.com/icons2/1091/PNG/512/bank_78392.png' alt=''/>
  
  <h1 className='p-3 mb-2 bg-info text-white'>Global Bank</h1>
 
</nav>
<section className='container'>
<div className='header-amount'>
            <div>Name: Diya Banerjee</div>
            <div>Amount : {balance}</div>
           
            <br />
            
        </div>
</section>
        
        
    </div>;
};

export { Header };