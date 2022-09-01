import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const checkUserSession = () => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
};

export const googleSignInStart = () => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
};

export const emailSignInStart = (email, password) => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
}

export const signInSuccess = (user) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
};

export const signInFailure = (err) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, err);
};

export const signUpStart = (displayName, email, password) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, { displayName, email, password });
};

export const signUpSuccess = (user, additionalInformation) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInformation });
};

export const signUpFailure = (err) => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, err);
};

export const signOutUserStart = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
};

export const signOutUserSuccess = () => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
};

export const signOutUserFailure = (err) => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, err);
};