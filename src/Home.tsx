import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useSelector,useDispatch } from 'react-redux';
import { SHOW_DATA } from './redux/store/reducer/action/constant/constant';
import { setBalance, showdata } from './redux/store/reducer/action/Action';
import { IProduct } from './redux/store/reducer/action/reducer';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Home : React.FC = React.memo(()=> {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const dispatch=useDispatch();
    let data= useSelector((state:any)=>state.data);
    useEffect(()=>{
        console.log("Home component");
        if(data.length === 0 ){
            console.log("Dispatching ShowData action");
        dispatch(showdata());
        
        
        
        }
    },[]);
    console.log("Rendering Home Component");
    useEffect(() => {
        if (location.state?.transactionSuccess) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate(".", { replace: true }); 
          }, 1000);
        }
      }, [location.state, navigate]);
    return (
    <div>
         <Header/>
         <div className='col-md-10 mt-3 container'>
            <h3 className='mt-4 mb-4 font-heading'>Your Transactions</h3>
            <div>
                <table className='table table-striped'>
                    <thead>
                    <tr className='table-primary'>
                        <th scope="col">Transaction-id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Credit/Debit</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                         data.map((product:IProduct,index:number)=>
                            
                            
                                <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.Amount}</td>
                                <td>{product.CreditOrDebit}</td>
                                <td>{product.Date}</td>
                                </tr>
                            
                         )
                         
                    }
                    </tbody>
                </table>
            </div>
            <span className='p-3 mt-4 mb-5'>
                <Link to="/sendmoney"><button type="button" className="btn btn-info m-5 p-3" >Send Money</button></Link>
                <Link to="/debitmoney"><button type="button" className="btn btn-primary m-5 p-3">Deposit Money</button></Link>
            </span>
            
         </div>
         <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your transaction was successful!</Modal.Body>
      </Modal>
    </div>
    );
});

export default Home;