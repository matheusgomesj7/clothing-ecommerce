import { AnyAction } from "redux";
import {
  signInSuccess,
  signUpSuccess,
  signOutUserSuccess,
  signInFailure,
  signUpFailure,
  signOutUserFailure
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  };

  if (signUpSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  };

  if (signOutUserSuccess.match(action)) {
    return { ...state, currentUser: null };
  };

  if (signInFailure.match(action) || signUpFailure.match(action) || signOutUserFailure.match(action)) {
    return { ...state, error: action.payload };
  };

  return state;
};