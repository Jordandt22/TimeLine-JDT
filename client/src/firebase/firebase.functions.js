import { Auth } from "./firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { developmentLogger } from "../utils/global.utils";

// Error Handler
const errorHandler = (error, cb) => {
  let errors = {};
  switch (error.code) {
    case "auth/email-already-in-use":
      errors = {
        email: "An account with this e-mail already exists.",
      };
      break;

    case "auth/wrong-password":
    case "auth/user-not-found":
      errors = {
        resetEmail: "This email doesn't exists.",
        password: "Incorrect password or email.",
        oldPassword: "Incorrect password or email.",
      };
      break;

    case "auth/requires-recent-login":
      errors = {
        email: "Sorry, an  error occured. Please logout and sign in.",
      };
      break;

    default:
      errors = {
        code: error.code,
      };
      break;
  }

  developmentLogger(error);
  cb(null, errors);
};

// On Auth Change
export const getCurrentUser = (cb) =>
  onAuthStateChanged(Auth, (user) => cb(user));

// Sign Out User
export const signOutUser = (cb) =>
  signOut(Auth)
    .then(() => cb())
    .catch((error) => errorHandler(error, cb));

// Delete Firebase User
export const deleteFirebaseUser = (cb) => {
  const user = Auth.currentUser;
  deleteUser(user)
    .then(() => cb({}, null))
    .catch((error) => errorHandler(error, cb));
};

// Create Email User
export const createEmailUser = (email, password, cb) =>
  createUserWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      cb(userCredential.user, null);
    })
    .catch((error) => errorHandler(error, cb));

// Sign In Email User
export const signInEmailUser = (email, password, cb) =>
  signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      cb(userCredential.user, null);
    })
    .catch((error) => errorHandler(error, cb));

// Send Reset Password Email
export const sendResetPasswordEmail = (email, cb) =>
  sendPasswordResetEmail(Auth, email)
    .then(() => {
      cb({}, null);
    })
    .catch((error) => errorHandler(error, cb));

// Re Auth User
const reAuthUser = async (email, password, cb) => {
  const cred = EmailAuthProvider.credential(email, password);

  return await reauthenticateWithCredential(Auth.currentUser, cred);
};

// Update User Email
export const updateUserEmail = (newEmail, oldEmail, password, cb) =>
  reAuthUser(oldEmail, password, cb)
    .then(() =>
      updateEmail(Auth.currentUser, newEmail)
        .then(() => cb({}, null))
        .catch((error) => errorHandler(error, cb))
    )
    .catch((error) => errorHandler(error, cb));

// Update User Password
export const updateUserPassword = (email, oldPassword, newPassword, cb) =>
  reAuthUser(email, oldPassword, cb)
    .then(() =>
      updatePassword(Auth.currentUser, newPassword)
        .then(() => cb({}, null))
        .catch((error) => errorHandler(error, cb))
    )
    .catch((error) => errorHandler(error, cb));

// ---- Providers ----

// Google
const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
export const signInWithGoogle = (cb) =>
  signInWithPopup(Auth, GoogleProvider)
    .then((result) => {
      cb(result.user, null);
    })
    .catch((error) => errorHandler(error, cb));
