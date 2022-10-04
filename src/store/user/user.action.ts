import { USER_ACTION_TYPES } from "./user.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";
import { User } from 'firebase/auth';

// export type SetCurrentUser = ActionWithPayload<
//   USER_ACTION_TYPES.SET_CURRENT_USER,
//   UserData
// >

// export const setCurrentUser = withMatcher((user: UserData) => {
//   createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
// });

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILURE,
  Error
>;

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { displayName: string; email: string; password: string }
>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalInformation: AdditionalInformation }
>;

export type SignUpFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILURE,
  Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILURE,
  Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
  return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
  return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
});

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => {
  return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
});

export const signInSuccess = withMatcher((user: UserData & { id: string } ): SignInSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
});

export const signInFailure = withMatcher((err: Error): SignInFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, err);
});

export const signUpStart = withMatcher((displayName: string, email: string, password: string): SignUpStart => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_START, { displayName, email, password });
});

export const signUpSuccess = withMatcher((user: User, additionalInformation: AdditionalInformation): SignUpSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInformation });
});

export const signUpFailure = withMatcher((err: Error): SignUpFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, err);
});

export const signOutUserStart = withMatcher((): SignOutStart => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
});

export const signOutUserSuccess = withMatcher((): SignOutSuccess => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutUserFailure = withMatcher((err: Error): SignOutFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, err);
});