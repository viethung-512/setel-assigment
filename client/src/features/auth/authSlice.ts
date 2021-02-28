import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import authAPI from '../../app/api/authAPI';
import { User } from '../../app/types/user';

interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user?: User | null;
}

const initialState: AuthState = {
  loading: false,
  authenticated: false,
};

const login = createAsyncThunk<User, undefined, { rejectValue: any[] }>(
  'auth:login',
  async (_, thunkAPI) => {
    try {
      const user = await authAPI.login();

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const getMe = createAsyncThunk<User, undefined, { rejectValue: any[] }>(
  'auth:getMe',
  async (_, thunkAPI) => {
    try {
      const user = await authAPI.getMe();

      return user;
    } catch (err) {
      await thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const logout = createAsyncThunk<unknown, undefined, { rejectValue: any[] }>(
  'auth:logout',
  async (_, thunkAPI) => {
    try {
      await authAPI.logout();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.authenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    setUnAuth: state => {
      state.authenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    /** LOGIN_START  */
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.authenticated = false;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
    });
    /** LOGIN_END  */

    /** LOGOUT_START  */
    builder.addCase(logout.pending, state => {
      state.loading = true;
      state.authenticated = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, state => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
    });
    /** LOGOUT_END  */

    /** GET_ME_START  */
    builder.addCase(getMe.pending, state => {
      state.loading = true;
      state.authenticated = false;
      state.user = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, state => {
      state.loading = false;
      state.authenticated = false;
      state.user = null;
    });
    /** GET_ME_END  */
  },
});

export const { setAuth, setUnAuth } = authSlice.actions;
export { login, logout, getMe };
export default authSlice.reducer;
