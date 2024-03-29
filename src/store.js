import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  passwordResetReducer,
} from "./reducer/userReducer";

import {
  professionalDetailsReducers,
  professionalListReducers,
  formReducer,
} from "./reducer/professionalReducer";

import { reviewsReducer, reviewListAllReducer } from "./reducer/reviewsReducer";

import {
  bookProfessionalReducer,
  cancelBookingReducer,
  getUserBookingsReducer,
} from "./reducer/bookReducer";

import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  professionalList: professionalListReducers,
  professionalDetail: professionalDetailsReducers,
  form: formReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,

  reviews: reviewsReducer,
  reviewListAll: reviewListAllReducer,

  bookProfessional: bookProfessionalReducer,
  cancelBooking: cancelBookingReducer,
  getUserBookings: getUserBookingsReducer,
  passwordReset: passwordResetReducer,
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
  preloadedState: initialState, // declare the initial state here
});

export default store;
