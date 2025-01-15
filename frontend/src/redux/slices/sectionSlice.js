import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const getSections = createAsyncThunk('/id/pages', async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.get(`/page/${data?.id}/sections`, {
          headers: {
            'x-access-token': data?.token, // Sending the token in the headers
          },
        }),
        {
          loading: "Loading...", // Loading message
          success: "Successfully get sections", // Success message
          error: (error) => {
            // Error handling
            return error?.response?.data?.message || "Failed to get sections";
          },
        }
      );
  
      // Return the response data if the request is successful
      return response.data;
    } catch (error) {
      // If the request fails, reject with value
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  });
  

const sectionSlice = createSlice({
    name:'section',
    initialState:{
        sections:[]
    },
    // reducers:{}
    extraReducers:(builder) => {
        builder.addCase(getSections?.fulfilled,(state,action) => {
            state.sections = action?.payload?.data
        })
    }
})

export default sectionSlice.reducer;