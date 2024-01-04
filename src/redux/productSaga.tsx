// import {type} from '@testing-library/user-event/dist/type';
// import {takeEvery,put} from 'redux-saga/effects'
// import { SET_DETAILS, SHOW_DATA } from './store/reducer/action/constant/constant';
// function* getDetails():Generator<any,void,any>{
//     try{
//     let data = yield fetch("http://localhost:3500/bankdetails");
//     data=yield data.json();
//     yield put({type:SET_DETAILS,data});
// } catch(error)
// {
//     console.error("Error fetching data:",error);
// }
// }
// function* productSaga():Generator<any,void,any>
// {
//     yield takeEvery(SHOW_DATA,getDetails);
// }
// export default productSaga;
import { takeEvery, put, call } from 'redux-saga/effects';
import { SET_DETAILS,SHOW_DATA } from './store/reducer/action/constant/constant';
import { showdata } from './store/reducer/action/Action';
 
// Example API function to fetch data
const fetchDataFromApi = async () => {
  try {
const response = await fetch('http://localhost:3500/bankdetails');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
 
function* getDetails(): Generator<any, void, any> {
  try {
    // Call the API function to fetch data
    const data = yield call(fetchDataFromApi);
    
    // Dispatch the SET_DETAILS action with the fetched data
    yield put({ type: SET_DETAILS, data });
  } catch (error) {
    console.error('Error fetching data:', error);
  
  }
}
 
// Watch for SHOW_DATA action and run getDetails saga
function* productSaga(): Generator<any, void, any> {
  yield takeEvery(SHOW_DATA, getDetails);
}
 
export default productSaga;