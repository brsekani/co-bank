import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase";
import { toast } from "react-toastify";

// Check localStorage for user data on initial load
const storedUser = localStorage.getItem("CoBankuser")
  ? JSON.parse(localStorage.getItem("CoBankuser"))
  : null;

const initialState = {
  userData: storedUser, // Initialize with the user from localStorage if available
  accountData: null,
  transactionsData: null,
  isLoading: false,
  isError: false,
  message: "",
};

// Thunks for signup, login, and logout
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) return rejectWithValue(error.message);
    return user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Supabase login with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return rejectWithValue(error.message);

      const user_id = data?.user?.id;
      if (!user_id) return rejectWithValue("User ID not found");

      // Fetch user details from the account table
      const { data: account, error: accountError } = await supabase
        .from("Accounts")
        .select("*")
        .eq("user_id", user_id);

      if (accountError) return rejectWithValue(accountError.message);

      const account_id = account[0].account_id;

      // Store user_id and account_id in localStorage
      localStorage.setItem("CoBankuser_id", user_id);
      localStorage.setItem("CoBank_account_id", account_id);

      // Return relevant data
      return { user_id, account_id };
    } catch (err) {
      return rejectWithValue(err.message); // Handle unexpected errors
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // Ensure you're passing a string to toast.error
      toast.error("An error occurred while logging out.");
      return rejectWithValue(error.message);
    }

    // Clear user data from localStorage on logout
    localStorage.removeItem("CoBankuser_id");
    localStorage.removeItem("CoBank_account_id");
    toast.success("logout sucessful");
    // localStorage.removeItem("CoBankuser");
    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.message = "Signup successful!";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.userData = action.payload.user[0];
        // state.accountData = action.payload.account[0];
        // state.transactionsData = action.payload.transactions;
        state.isLoading = false;
        state.message = "Login successful!";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.message = "Logout successful!";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
