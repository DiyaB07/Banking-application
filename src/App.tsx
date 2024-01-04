import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import Home from './Home';
import store from './redux/store/reducer/action/store';
import { SendMoney } from './SendMoney';
import { Debitmoney } from './debit';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sendmoney" element={<SendMoney />}></Route>
          <Route path="/debitmoney" element={<Debitmoney />}></Route>
        </Routes>
        </BrowserRouter>
      
      </Provider>
      
    </div>
  );
}

export default App;
