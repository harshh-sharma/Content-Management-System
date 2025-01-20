import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const getContents = createAsyncThunk(
  "/id/contents",
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.get(`/content/${data?.id}/contents`, {
          headers: {
            "x-access-token": data?.token, // Sending the token in the headers
          },
        }),
        {
          loading: "Loading...", // Loading message
          success: "Successfully get contents", // Success message
          error: (error) => {
            // Error handling
            console.log(error);
            
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
  }
);

export const addContent = createAsyncThunk(
  "/content/",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data==", data);
      // return;
      const formData = new FormData();
      formData.append("section_id", data?.id);
      formData.append("content_type", data?.content_type);
      formData.append("text", data?.content_data.text);
      formData.append("file", data?.content_data.image_url);

      const response = axiosInstance.post("/content/", formData, {
        headers: {
          "x-access-token": data?.token,
        },
      });

      toast.promise(response, {
        loading: "creating ...",
        success: "Content successfully created",
        error: "failed to create content",
      });

      return response;
    } catch (error) {
      console.log(error);

      // If the request fails, reject with value
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

export const deleteContent = createAsyncThunk('/content/:id',async(data,{ rejectWithValue }) => {
   try {
      const response = axiosInstance.delete(`/content/${data?.contentId}`,{
        headers:{
          'x-access-token':data?.token
        }
      })

      toast.promise(response,{
        loading:'deleting...',
        success:'successfully deleted content',
        error:'failed to delete content'
      })

      return response;
   } catch (error) {
    console.log("err",error);
    
    return rejectWithValue(error?.response?.data || "Something went wrong");
   }
})
export const updateContent = () => {};

const contentSlice = createSlice({
  name: "content",
  initialState: {
    contents: [],
  },
  // reducers:{}
  extraReducers: (builder) => {
    builder.addCase(getContents?.fulfilled, (state, action) => {
      console.log("action ", action);

      state.contents = action?.payload?.data;
    });
  },
});

export default contentSlice.reducer;
