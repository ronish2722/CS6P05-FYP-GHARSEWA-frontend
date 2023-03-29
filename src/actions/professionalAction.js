import axios from "axios";
import {
  PRO_LIST_SUCCESS,
  PRO_LIST_REQUEST,
  PRO_LIST_FAIL,
  PRO_DETAILS_SUCCESS,
  PRO_DETAILS_REQUEST,
  PRO_DETAILS_FAIL,
} from "../constant/professionalConstant";

export const listProfessionals = () => async (dispatch) => {
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

export const listProfessionalsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/professionals/${id}`);

    dispatch({ type: PRO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setFormData = (formData) => ({
  type: "SET_FORM_DATA",
  payload: formData,
});
