import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/user/register", data),
        {
          pending: "Registering...",
          success: "User successfully registered",
          error: (data) => {
            // `data` contains the error object
            console.log("data", data);
            return data?.response?.data?.message || "Registration failed";
          },
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass error payload to rejected action
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post("/user/login", data),
        {
          pending: "login...",
          success: "User successfully loggedIn",
          error: (data) => {
            // `data` contains the error object
            console.log("data", data);
            return data?.response?.data?.success || "Login failed";
          },
        }
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass error payload to rejected action
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);

export const logout = createAsyncThunk('/auth/logout',() => {
   state.isLoggedIn = false;
   state.token = null;
   localStorage.removeItem('x-access-token');
   localStorage.removeItem('isLoggedIn');
});

const authSlice = createSlice({
  name: "auth",
  initialState : {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",  // Check localStorage
    'x-access-token': localStorage.getItem("x-access-token"),  // Get token from localStorage
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      console.log("action", action);

      // Save the token and logged-in status to localStorage
      state.isLoggedIn = true;
      state["x-access-token"] = action.payload.token;

      // Store both the token and isLoggedIn in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("x-access-token", action.payload.token);
    });

    builder.addCase(register.rejected, (state, action) => {
      // Handle the rejected state if needed (for example, show an error message)
      state.isLoggedIn = false;
      state["x-access-token"] = null;
    });

    builder.addCase(login.fulfilled,(state,action) => {
      console.log("yes fukllfilled");
      
      state.isLoggedIn = true;
      state["x-access-token"] = action.payload.token;

      // Store both the token and isLoggedIn in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("x-access-token", action.payload.token);
    })

    builder.addCase(login.rejected, (state,action) => {
      state.isLoggedIn = false;
      state["x-access-token"] = null;
    })
  }
});

export default authSlice.reducer;
