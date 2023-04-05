import {
  BOOKING_STATUS_REQUEST,
  BOOKING_STATUS_SUCCESS,
  BOOKING_STATUS_FAIL,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
  USER_BOOKINGS_REQUEST,
  USER_BOOKINGS_SUCCESS,
  USER_BOOKINGS_FAIL,
} from "../constant/bookConstant";

export const bookProfessionalReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_STATUS_REQUEST:
      return { loading: true };
    case BOOKING_STATUS_SUCCESS:
      return { loading: false, success: true, bookId: action.payload };
    case BOOKING_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_BOOKING_REQUEST:
      return { loading: true };
    case CANCEL_BOOKING_SUCCESS:
      return { loading: false, success: true };
    case CANCEL_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserBookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case USER_BOOKINGS_REQUEST:
      return { loading: true };
    case USER_BOOKINGS_SUCCESS:
      return { loading: false, bookings: action.payload };
    case USER_BOOKINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
