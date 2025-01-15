import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const getPages = createAsyncThunk('/id/pages', async (data, { rejectWithValue }) => {
    try {
      console.log("tokenn", data); // Checking the token and data being passed
  
      const response = await toast.promise(
        axiosInstance.get(`/page/${data?.id}/pages`, {
          headers: {
            'x-access-token': data?.token, // Sending the token in the headers
          },
        }),
        {
          loading: "Loading...", // Loading message
          success: "Successfully got pages", // Success message
          error: (error) => {
            // Error handling
            return error?.response?.data?.message || "Failed to get pages";
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
  

const pageSlice = createSlice({
    name:'page',
    initialState:{
        pages:[]
    },
    // reducers:{}
    extraReducers:(builder) => {
        builder.addCase(getPages?.fulfilled,(state,action) => {
            state.pages = action?.payload?.data
        })
    }
})

export default pageSlice.reducer;