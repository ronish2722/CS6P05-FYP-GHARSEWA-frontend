import {
  PRO_LIST_SUCCESS,
  PRO_LIST_REQUEST,
  PRO_LIST_FAIL,
  PRO_DETAILS_SUCCESS,
  PRO_DETAILS_REQUEST,
  PRO_DETAILS_FAIL,
} from "../constant/professionalConstant";
export const professionalListReducers = (
  state = { professionals: [] },
  action
) => {
  switch (action.type) {
    case PRO_LIST_REQUEST:
      return { loading: true, professionals: [] };

    case PRO_LIST_SUCCESS:
      return { loading: false, professionals: action.payload };

    case PRO_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const professionalDetailsReducers = (
  state = { professional: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRO_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRO_DETAILS_SUCCESS:
      return { loading: false, professional: action.payload };

    case PRO_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const initialState = { formData: {} };

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};
