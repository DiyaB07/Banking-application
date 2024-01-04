import React from "react";
import { createStore,Middleware,Store } from "redux";
import createSagaMiddleware from 'redux-saga'
import { ProductAction,ProductState,DispatchTypes,Reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import productSaga from "../../../productSaga";
import transactionData from "../../../postSaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(
    {
        reducer:Reducer,
        middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(sagaMiddleware as unknown as Middleware),
    }
)
sagaMiddleware.run(productSaga)
sagaMiddleware.run(transactionData)

export default store;

