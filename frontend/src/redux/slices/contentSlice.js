import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

// AsyncThunk to get contents
export const getContents = createAsyncThunk(
  "/id/contents",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content/${data?.id}/contents`, {
        headers: {
          "x-access-token": data?.token,
        },
      });

      toast.success("Successfully fetched contents");

      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to get contents";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// AsyncThunk to add content
export const addContent = createAsyncThunk(
  "/content/",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("section_id", data?.id);
      formData.append("content_type", data?.content_type);
      formData.append("text", data?.content_data?.text);
      formData.append("file", data?.content_data?.image_url);

      const response = await axiosInstance.post("/content/", formData, {
        headers: {
          "x-access-token": data?.token,
        },
      });

      toast.success("Content successfully created");

      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to create content";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// AsyncThunk to delete content
export const deleteContent = createAsyncThunk(
  "/delete/:id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/content/${data?.contentId}`, {
        headers: {
          "x-access-token": data?.token,
        },
      });

      toast.success("Successfully deleted content");

      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to delete content";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// AsyncThunk to update content
export const updateContent = createAsyncThunk(
  "/content/:id",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("content_type", data?.content_type);
      formData.append("text", data?.content_data?.text);
      formData.append("file", data?.content_data?.image_url);

      const response = await axiosInstance.put(`/content/${data?.contentId}`, formData, {
        headers: {
          "x-access-token": data?.token,
        },
      });

      toast.success("Content successfully updated");

      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update content";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Content slice
const contentSlice = createSlice({
  name: "content",
  initialState: {
    contents: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Get contents
    builder.addCase(getContents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getContents.fulfilled, (state, action) => {
      state.loading = false;
      state.contents = action.payload.data;
    });
    builder.addCase(getContents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add content
    builder.addCase(addContent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addContent.fulfilled, (state, action) => {
      state.loading = false;
      state.contents.push(action.payload.data);
    });
    builder.addCase(addContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete content
    builder.addCase(deleteContent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.loading = false;
      state.contents = state.contents.filter(
        (content) => content.id !== action.meta.arg.contentId
      );
    });
    builder.addCase(deleteContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update content
    builder.addCase(updateContent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.contents.findIndex(
        (content) => content.id === action.meta.arg.contentId
      );
      if (index !== -1) {
        state.contents[index] = action.payload.data;
      }
    });
    builder.addCase(updateContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default contentSlice.reducer;
