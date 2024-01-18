import { Dispatch } from "@reduxjs/toolkit";
import authSlice from "../Reducer/auth";
import { IUser } from "../../Utils/Interfaces";

const { loginSuccess, logoutSuccess, retrieveUserSuccess } = authSlice.actions;

const login = (data: IUser) => async (dispatch: Dispatch) => {
  localStorage.setItem("userLoginData", JSON.stringify(data));
  dispatch(loginSuccess(data));
};

const retrieveUser = () => async (dispatch: Dispatch) => {
  const userData = JSON.parse(localStorage.getItem("userLoginData") || "{}");
  dispatch(retrieveUserSuccess(userData));
};

const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("userLoginData");
  const payload = {
    id: null,
    name: "",
    username: "",
    password: "",
  };
  dispatch(logoutSuccess(payload));
};

const authActions = {
  login,
  logout,
  retrieveUser,
};

export default authActions;
