import { createReducer } from "@reduxjs/toolkit";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./actions";

interface UserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: any[];
}

const initialState: UserState = {
  loading: false,
  success: false,
  error: null,
  users: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUsersStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsersSuccess, (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload;
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default userReducer;
