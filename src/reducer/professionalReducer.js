import {
  PRO_LIST_SUCCESS,
  PRO_LIST_REQUEST,
  PRO_LIST_FAIL,
} from "../constant/professionalConstant";
export const professionalListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRO_LIST_REQUEST:
      return { loading: true, professionals: [] };

    case PRO_LIST_SUCCESS:
      return { loading: true, professionals: action.payload };

    case PRO_LIST_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};
