import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
} from "../constant/reviewConstant";

export const reviewsReducer = (
  state = { reviews: [], averageRating: 0 },
  action
) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { ...state, loading: true };
    case REVIEW_LIST_SUCCESS:
      const sum = action.payload.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const average = sum / action.payload.length || 0;
      return {
        ...state,
        loading: false,
        reviews: action.payload,
        averageRating: average.toFixed(1),
      };
    case REVIEW_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewListAllReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "REVIEW_LIST_ALL_SUCCESS":
      return { ...state, reviews: action.payload };
    case "REVIEW_LIST_ALL_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;
