import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
} from "./reducer/userReducer";

import {
  professionalDetailsReducers,
  professionalListReducers,
} from "./reducer/professionalReducer";

import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  professionalList: professionalListReducers,
  professionalDetail: professionalDetailsReducers,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// const store = configureStore({
//   reducer,
//   initialState,
//   devTools: process.env.NODE_ENV !== "production",
//   enhancers: [applyMiddleware(...middleware)],
// });

const store = configureStore({
  reducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== "production",
  // enhancers: [composeWithDevTools()],
  initialState: initialState, // declare the initial state here
});

export default store;
