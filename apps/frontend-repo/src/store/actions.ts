import { createAction } from "@reduxjs/toolkit";

export const fetchUsersStart = createAction("fetchUsersStart");
export const fetchUsersSuccess = createAction<any[]>("fetchUsersSuccess");
export const fetchUsersFailure = createAction<string>("fetchUsersFailure");
