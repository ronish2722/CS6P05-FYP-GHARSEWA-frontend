import {
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_LIST_FAIL,
} from "../constant/todolistConstant";

export const todoListReducers = (state = { todo: [] }, action) => {
  switch (action.type) {
    case TODO_LIST_REQUEST:
      return { loading: true, professionals: [] };

    case TODO_LIST_SUCCESS:
      return { loading: false, professionals: action.payload };

    case TODO_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
