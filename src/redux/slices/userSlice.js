import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import KataService from '../../services/KataService';

const kataService = new KataService();

export const signIn = createAsyncThunk('user/signIn', async function (body, { rejectWithValue }) {
  try {
    const res = await kataService.signInUser(body);

    if (res.user) {
      localStorage.setItem('token', res.user.token);
    }

    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getUser = createAsyncThunk('user/getUser', async function (token) {
  try {
    return await kataService.getUser(token);
  } catch (error) {
    localStorage.removeItem('token');
  }
});

export const signUp = createAsyncThunk('user/signUp', async function (body, { rejectWithValue }) {
  try {
    return await kataService.signUpUser(body);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async function ({ body, token }, { rejectWithValue }) {
  try {
    return await kataService.updateUser(body, token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, error: null, success: false },
  reducers: {
    logOut(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
    changeSucces(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.success = true;
      state.user = action.payload.user;

      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;

      state.error = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { logOut, changeSucces } = userSlice.actions;
export default userSlice.reducer;
