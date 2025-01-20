import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import toast from "react-hot-toast";

export const getAllUsers = createAsyncThunk(
  'auth/users',
  async (data, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.get("/user/",{
          headers:{
            'x-access-token':data?.token
          }
        }),
        {
          pending: "loading...",
          success: "User successfully get",
          error: (data) => {
            console.log("data", data);
            return data?.response?.data?.message ||  "failed to get user";
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);

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
            console.log("data", data);
            return data?.response?.data?.message || "Registration failed";
          },
        }
      );
      return response.data;
    } catch (error) {
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
          pending: "Logging in...",
          success: "User successfully logged in",
          error: (data) => {
            console.log("data", data);
            return data?.response?.data?.message || "Login failed";
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);

// No need to use createAsyncThunk for logout since it's a synchronous operation
const logout = () => (dispatch) => {
  localStorage.removeItem('x-access-token');
  localStorage.removeItem('isLoggedIn');
  dispatch(authSlice.actions.logout());
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    'x-access-token': localStorage.getItem("x-access-token"),
    user:localStorage.getItem("user"),
    role:localStorage.getItem("role")
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state["x-access-token"] = null;
      state.role = null;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state["x-access-token"] = action.payload.token;
      state.role = action?.payload?.role;
      state.user = action?.payload?.user;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("x-access-token", action.payload.token);
      localStorage.setItem("role",action?.payload?.role);
      localStorage.setItem("user",action?.payload?.user);
    });

    builder.addCase(register.rejected, (state) => {
      state.isLoggedIn = false;
      state["x-access-token"] = null;
      state.role = null;
      state.user = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state["x-access-token"] = action.payload.token;
      state.role = action?.payload?.role;
      state.user = action?.payload?.user;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("x-access-token", action.payload.token);
      localStorage.setItem("role",action?.payload?.role);
      localStorage.setItem("user",action?.payload?.user);
    });

    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state["x-access-token"] = null;
      state.role = null;
      state.user = null;
    });
  }
});

export const updateUser = createAsyncThunk(
  'user/:id',
  async (data, { rejectWithValue }) => {
    console.log("tojen",data);
    
    try {
      const response = await toast.promise(
        axiosInstance.put(`/user/role/${data?.userId}`, data,{
          headers:{
            'x-access-token':data?.token
          }
        }),
        {
          pending: "updating in...",
          success: "User successfully updated",
          error: (data) => {
            console.log("data", data);
            return data?.response?.data?.message || "failed to update";
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.success);
    }
  }
);

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;

export { logout }; // Export the logout function for use in your components
