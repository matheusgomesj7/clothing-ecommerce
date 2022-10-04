import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import { AdditionalInformation } from '../../utils/firebase/firebase.utils';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutUserSuccess,
  signOutUserFailure,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
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
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield* put(signInFailure(err as Error));
  };
};

export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth, userAuth, additionalInformation
    );

    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    };
  } catch (err) {
    yield* put(signInFailure(err as Error));
  }
};

export function* signingInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield* put(signInFailure(err as Error));
  }
}

export function* signingInWithEmail({ payload: { email, password } }: EmailSignInStart) { 
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    };
  } catch (err) {
    yield* put(signInFailure(err as Error));
  }
};

export function* signingUp({ payload: { displayName, email, password } }: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    };
  } catch (err) {
    yield* put(signUpFailure(err as Error));
  };
};

export function* signInAfterSignUp({ payload: { additionalInformation, user } }: SignUpSuccess) {
  try {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);
  } catch (err) {
    yield* put(signInFailure(err as Error));
  };
};

export function* signingOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutUserSuccess());
  } catch (err) {
    yield* put(signOutUserFailure(err as Error));
  }
};

export function* onCheckUserSession() {
  yield* takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticated
  );
};

export function* onGoogleSignIn() {
  yield* takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signingInWithGoogle
  );
};

export function* onSignInWithEmail() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,  
    signingInWithEmail
  )
};

export function* onSignUp() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_UP_START,
    signingUp
  )
};

export function* onSignUpSuccess() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    signInAfterSignUp
  )
};

export function* onSignOut() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_OUT_START,
    signingOut
  )
};

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onSignInWithEmail),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOut)
  ]);
};