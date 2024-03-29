import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

export const apiLoginCallBegan = createAction("api/loginCallBegan");
export const apiLoginCallSuccess = createAction("api/loginCallSuccess");
export const apiLoginCallFailed = createAction("api/loginCallFailed");

export const apiRegisterCallBegan = createAction("api/registerCallBegan");
export const apiRegisterCallSuccess = createAction("api/registerCallSuccess");
export const apiRegisterCallFailed = createAction("api/registerCallFailed");
