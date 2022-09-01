import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutUserSuccess,
  signOutUserFailure,
} from './user.action';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailure(err));
  };
};

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth, userAuth, additionalInformation
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    yield put(signInFailure(err));
  }
};

export function* signingInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* signingInWithEmail({ payload: { email, password } }) { 
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailure(err));
  }
};

export function* signingUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (err) {
    yield put(signUpFailure(err));
  };
};

export function* signInAfterSignUp({ payload: { additionalInformation, user } }) {
  try {
    yield call(getSnapshotFromUserAuth, user, additionalInformation);
  } catch (err) {
    yield put(signInFailure(err));
  };
};

export function* signingOut() {
  try {
    yield call(signOutUser);
    yield put(signOutUserSuccess());
  } catch (err) {
    yield put(signOutUserFailure(err));
  }
};

export function* onCheckUserSession() {
  yield takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticated
  );
};

export function* onGoogleSignIn() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signingInWithGoogle
  );
};

export function* onSignInWithEmail() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,  
    signingInWithEmail
  )
};

export function* onSignUp() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_UP_START,
    signingUp
  )
};

export function* onSignUpSuccess() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    signInAfterSignUp
  )
};

export function* onSignOut() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_OUT_START,
    signingOut
  )
};

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onSignInWithEmail),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOut)
  ]);
};