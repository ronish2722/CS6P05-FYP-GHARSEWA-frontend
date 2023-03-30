import axios from "axios";
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
} from "../constant/reviewConstant";

export const listReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/review/${id}/`);

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllReviews = () => async (dispatch) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/review/");
    dispatch({
      type: "REVIEW_LIST_ALL_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REVIEW_LIST_ALL_FAIL",
      payload: error.message,
    });
  }
};
