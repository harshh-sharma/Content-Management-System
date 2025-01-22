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

  export const addDomain = createAsyncThunk("/domain/", async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
  
      const response = axiosInstance.post("/domain", data, {
        headers: {
          'x-access-token': data?.token, // Sending the token in the headers
        },
      });
  
      toast.promise(response, {
        loading: "Creating...",
        success: "Domain created successfully",
        error: "Failed to create the domain",
      });
  
      return (await response)?.data; // Ensure you're returning the actual data from the response
    } catch (error) {
      console.log("Error:", error);
  
      // Show a toast for the error
      toast.error(error?.response?.data?.message || "An error occurred");
  
      // Use rejectWithValue to pass the error back to the rejected state
      return rejectWithValue(error?.response?.data);
    }
  });
  

export const deleteDomain = createAsyncThunk("/domain/:id",async (data) => {
  try {
    const response = axiosInstance.delete(`/domain/${data?.id}`,{
      headers: {
        'x-access-token': data?.token
      },
    });
    toast.promise(response,{
     loading:"creating...",
     success:"domain deleted successfully",
     error:"failed to delete the domain"
    })
    return (await response);
 } catch (error) {
   toast.error(error?.response?.data?.message);
 }
})

export const updateDomain = createAsyncThunk("/domain/:id", async (data) => {
  try {
    console.log("data", data);
    
    // Send the domain data as part of the body and token in headers
    const response =  axiosInstance.put(`/domain/${data?._id}`, {
      name: data?.name,  // Assuming `name` and `url` are the properties you need to update
      url: data?.url,
    }, {
      headers: {
        'x-access-token': data?.token,  // Send the token in headers
      },
    });

    toast.promise(response, {
      loading: "Updating...",
      success: "Domain updated successfully",
      error: "Failed to update the domain",
    });

    return await response;  // Ensure you return the correct data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error updating domain");
  }
});


const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    domains: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDomains.fulfilled, (state, action) => {
        state.domains = action?.payload?.data;
      })
      .addCase(updateDomain.fulfilled,(state,action) => {
        console.log("action",action);
        
        state.domains = action?.payload?.data?.data;
      })
  }
});

export default domainSlice.reducer;
