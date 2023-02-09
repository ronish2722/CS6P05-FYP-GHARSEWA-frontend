import { configureStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStroage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initailState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore(
  reducer,
  initailState,
  composeWithDevTools(applyMiddleware(...middleware))
);
