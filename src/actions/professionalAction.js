import axios from "axios";
import {
  PRO_LIST_SUCCESS,
  PRO_LIST_REQUEST,
  PRO_LIST_FAIL,
} from "../constant/professionalConstant";

const listProfessionals = () => async (dispatch) => {
  try {
    dispatch({ type: PRO_LIST_REQUEST });

    const { data } = await axios.get("/api/professionals/");

    dispatch({ type: PRO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
