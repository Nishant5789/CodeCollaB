import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, getLoggedUser, loginUser, signOut } from './authApi';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity '
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    console.log(response);
    // localStorage.setItem('jwt', response.data);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      // localStorage.setItem('jwt', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getLoggedUserAsync = createAsyncThunk('user/getLoggedUser', async (loginData, { rejectWithValue }) => {
    try {
      const response = await getLoggedUser();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  });

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    // const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
    
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(getLoggedUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLoggedUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.loggedInUser = null;
      })
      .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading';
          })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
  },
});

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;