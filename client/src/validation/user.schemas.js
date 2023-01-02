import * as Yup from "yup";

// Sign Up
export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "First Name is required.")
    .max(150, "Your first name exceeds the character limit (150).")
    .trim()
    .required("First Name is required."),
  lastName: Yup.string()
    .min(1, "Last Name is required.")
    .max(150, "Your last name exceeds the character limit (150).")
    .trim()
    .required("Last Name is required."),
  email: Yup.string()
    .email("Must enter a valid e-mail.")
    .min(1, "An e-mail is required.")
    .max(300, "Your e-mail exceeds the character limit (300).")
    .trim()
    .required("An e-mail is required."),
  password: Yup.string()
    .trim()
    .min(8, "Your password must be atleast 8 characters.")
    .max(100, "Your password exceeds the character limit (100).")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must include atleast 1 upper and lower case letter, 1 number, and 1 special symbol."
    )
    .required("A password is required."),
  confirmPassword: Yup.string()
    .trim()
    .min(1, "You must confirm your password.")
    .max(100, "Your confirmation password exceeds the character limit (100).")
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("You must confirm your password."),
});

// Sign In
export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must enter a valid e-mail.")
    .min(1, "An e-mail is required.")
    .max(300, "Your e-mail exceeds the character limit (300).")
    .trim()
    .required("An e-mail is required."),
  password: Yup.string()
    .trim()
    .min(8, "Your password is atleast 8 characters.")
    .max(100, "Your password exceeds the character limit (100).")
    .required("A password is required."),
});

// Reset Password
export const ResetPasswordSchema = Yup.object().shape({
  resetEmail: Yup.string()
    .email("Must enter a valid e-mail.")
    .min(1, "An e-mail is required.")
    .max(300, "Your e-mail exceeds the character limit (300).")
    .trim()
    .required("An e-mail is required."),
});

// Update Email
export const UpdateEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must enter a valid email.")
    .min(1, "An email is required.")
    .max(300, "Your email exceeds the character limit (300).")
    .trim()
    .required("An email is required."),
  password: Yup.string()
    .trim()
    .min(8, "Your password is atleast 8 characters.")
    .max(100, "Your password exceeds the character limit (100).")
    .required("A password is required."),
});

// Update Password
export const UpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .trim()
    .min(8, "Your old password is atleast 8 characters.")
    .max(100, "Your old password exceeds the character limit (100).")
    .required("Your old password is required."),
  newPassword: Yup.string()
    .trim()
    .min(8, "Your new password must be atleast 8 characters.")
    .max(100, "Your new password exceeds the character limit (100).")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must include atleast 1 upper and lower case letter, 1 number, and 1 special symbol."
    )
    .required("A password is required."),
  confirmPassword: Yup.string()
    .trim()
    .min(1, "You must confirm your new password.")
    .max(100, "Your confirmation password exceeds the character limit (100).")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
    .required("You must confirm your new password."),
});
