import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../axios/axiosInstance";

export const getDomains = createAsyncThunk("/domain/",async () => {
    try {
       const response = axiosInstance.get("/domain");
       toast.promise(response,{
        loading:"loading...",
        success:"domains loaded successfully",
        error:"failed to get the domains"
       })
       return (await response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  })

const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    domains: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDomains.fulfilled, (state, action) => {
        state.domains = action.payload?.data;
      })
  }
});

export default domainSlice.reducer;
