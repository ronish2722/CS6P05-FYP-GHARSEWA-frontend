import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setReviews } from "../reducer/reviewsReducer";

export const getReviews = createAsyncThunk("reviews/getReviews", async (id) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/review/${id}/`);
  return response.data;
});
