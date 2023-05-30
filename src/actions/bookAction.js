import axios from "axios";
import {
  BOOKING_STATUS_FAIL,
  BOOKING_STATUS_REQUEST,
  BOOKING_STATUS_SUCCESS,
  USER_BOOKINGS_FAIL,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  CANCEL_BOOKING_FAIL,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
} from "../constant/bookConstant";

export const checkBookingStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_STATUS_REQUEST });

    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    if (userInfoFromStorage) {
      const response = await axios.get(`http://127.0.0.1:8000/api/view-book/`, {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      });
      dispatch({ type: BOOKING_STATUS_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: BOOKING_STATUS_SUCCESS, payload: null });
    }
  } catch (error) {
    dispatch({
      type: BOOKING_STATUS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listUserBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_BOOKINGS_REQUEST });

    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const response = await axios.get(
      `http://127.0.0.1:8000/api/get-user-bookings/`,
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    dispatch({ type: USER_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: USER_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const cancelBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_BOOKING_REQUEST });

    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const response = await axios.delete(
      `http://127.0.0.1:8000/api/cancel-booking/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CANCEL_BOOKING_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


