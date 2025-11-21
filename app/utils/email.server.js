export async function sendVerificationEmail(email, verificationToken) {
  console.log(`Sending verification email to: ${email}`);
  console.log(`Link: ${process.env.APP_URL || 'http://localhost:3000'}/auth/verify?token=${verificationToken}`);
  return { success: true };
}

export async function sendRegistrationConfirmation(email, eventName, registrationDetails) {
  console.log(`Sending registration confirmation to: ${email}`);
  console.log(`Event: ${eventName}`);
  return { success: true };
}

export async function sendApprovalNotification(email, eventName, status, reason = null) {
  console.log(`Sending approval notification to: ${email}`);
  console.log(`Event: ${eventName}, Status: ${status}`);
  if (reason) console.log(`Reason: ${reason}`);
  return { success: true };
}

export async function sendDataRequestConfirmation(email, requestType) {
  console.log(`Sending data request confirmation to: ${email}`);
  console.log(`Request type: ${requestType}`);
  return { success: true };
}
