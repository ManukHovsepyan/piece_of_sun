export enum Actions {
  redirectToValidateOtp = "REDIRECT_TO_VALIDATE_LOGIN_OTP",
  loginPage = "LOGIN_PAGE",
  loginPageAgain = "REDIRECT_TO_LOGIN_AGAIN",
  invalidCredentials = "INVALID_CREDENTIALS"
}

export enum ResetActions {
  resetPage = "REST_PAGE",
  resetValidateOtpPage = "RESET_VALIDATE_OTP_PAGE",
  resetChangePassPage = "RESET_CHANGE_PASS_PAGE",
  resetMoveLoginPage = "RESET_MOVE_LOGIN_PAGE",
}

export enum RegisterActions {
  registerPage = "REGISTER_PAGE",
  validateRegisterPage = "REGISTER_VALIDATE_PAGE",
  requestRegisterPage = "REGISTER_REQUEST_PAGE",
  registerSuccessPage = "REGISTER_SUCCESS_PAGE",
}