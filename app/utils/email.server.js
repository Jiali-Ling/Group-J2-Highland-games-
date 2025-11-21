// Email notification service
// In production, integrate with services like SendGrid, AWS SES, or Nodemailer

export async function sendVerificationEmail(email, verificationToken) {
  console.log(`📧 Sending verification email to: ${email}`);
  console.log(`Verification link: ${process.env.APP_URL || 'http://localhost:3000'}/auth/verify?token=${verificationToken}`);
  
  // TODO: Integrate with actual email service
  // Example with nodemailer:
  // await transporter.sendMail({
  //   from: '"Highland Games" <noreply@highlandgames.com>',
  //   to: email,
  //   subject: "Verify Your Email",
  //   html: `<p>Click <a href="${process.env.APP_URL}/auth/verify?token=${verificationToken}">here</a> to verify your email.</p>`
  // });
  
  return { success: true };
}

export async function sendRegistrationConfirmation(email, eventName, registrationDetails) {
  console.log(`📧 Sending registration confirmation to: ${email}`);
  console.log(`Event: ${eventName}`);
  console.log(`Details:`, registrationDetails);
  
  // TODO: Integrate with actual email service
  return { success: true };
}

export async function sendApprovalNotification(email, eventName, status, reason = null) {
  console.log(`📧 Sending approval notification to: ${email}`);
  console.log(`Event: ${eventName}, Status: ${status}`);
  if (reason) console.log(`Reason: ${reason}`);
  
  // TODO: Integrate with actual email service
  return { success: true };
}

export async function sendDataRequestConfirmation(email, requestType) {
  console.log(`📧 Sending data request confirmation to: ${email}`);
  console.log(`Request type: ${requestType}`);
  
  // TODO: Integrate with actual email service
  return { success: true };
}
