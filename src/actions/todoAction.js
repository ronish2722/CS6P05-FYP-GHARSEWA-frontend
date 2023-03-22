import axios from "axios";
import {
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_LIST_FAIL,
} from "../constant/todolistConstant";

export const listProfessionals = () => async (dispatch) => {
  try {
    dispatch({ type: TODO_LIST_REQUEST });

    const { data } = await axios.get("/api/users/todo");

    dispatch({ type: TODO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TODO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
