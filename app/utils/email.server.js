export async function sendVerificationEmail(email, verificationToken) {
  return { success: true };
}

export async function sendRegistrationConfirmation(email, eventName, registrationDetails) {
  return { success: true };
}

export async function sendApprovalNotification(email, eventName, status, reason = null) {
  return { success: true };
}

export async function sendDataRequestConfirmation(email, requestType) {
  return { success: true };
}
