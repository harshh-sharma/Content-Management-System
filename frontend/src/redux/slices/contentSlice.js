import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const getContents = createAsyncThunk('/id/contents', async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.get(`/content/${data?.id}/contents`, {
          headers: {
            'x-access-token': data?.token, // Sending the token in the headers
          },
        }),
        {
          loading: "Loading...", // Loading message
          success: "Successfully get contents", // Success message
          error: (error) => {
            // Error handling
            return error?.response?.data?.message || "Failed to get contents";
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
  

const contentSlice = createSlice({
    name:'content',
    initialState:{
        contents:[]
    },
    // reducers:{}
    extraReducers:(builder) => {
        builder.addCase(getContents?.fulfilled,(state,action) => {
            console.log("action ",action);
            
            state.contents = action?.payload?.data
        })
    }
})

export default contentSlice.reducer;