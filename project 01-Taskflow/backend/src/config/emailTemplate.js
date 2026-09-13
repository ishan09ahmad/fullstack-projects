export const registrationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to TaskFlow</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827;">

  <div style="padding: 40px 16px;">

    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
          TaskFlow
        </div>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px 36px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: #f3e8ff; border-radius: 14px; font-size: 26px;">
            👋
          </div>

          <h1 style="margin: 20px 0 8px; color: #111827; font-size: 28px; line-height: 1.3;">
            Welcome to TaskFlow
          </h1>

          <p style="margin: 0; color: #6b7280; font-size: 15px;">
            Your productivity journey starts here.
          </p>
        </div>

        <p style="margin: 0 0 18px; color: #374151; font-size: 16px;">
          Hi {{name}},
        </p>

        <p style="margin: 0 0 18px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Thanks for creating your TaskFlow account. We're glad to have you with us.
        </p>

        <p style="margin: 0 0 28px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          TaskFlow helps you organize your work, keep track of important tasks, and stay focused on what matters.
        </p>

        <!-- Highlight -->
        <div style="background-color: #faf5ff; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 16px 18px; margin-bottom: 30px;">
          <p style="margin: 0; color: #5b21b6; font-size: 14px; line-height: 1.6;">
            You're all set. Start creating tasks and make every day more organized.
          </p>
        </div>

        <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Here's to getting more done with less stress.
        </p>

      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 10px;">
        <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p style="margin: 0; color: #d1d5db; font-size: 12px;">
          Organize. Focus. Accomplish.
        </p>
      </div>

    </div>

  </div>

</body>
</html>
`;


export const passwordResetEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset OTP</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827;">

  <div style="padding: 40px 16px;">

    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 20px; font-weight: 700;">
          TaskFlow
        </div>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px 36px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: #f3e8ff; border-radius: 14px; font-size: 25px;">
            🔐
          </div>

          <h1 style="margin: 20px 0 8px; color: #111827; font-size: 27px; line-height: 1.3;">
            Reset Your Password
          </h1>

          <p style="margin: 0; color: #6b7280; font-size: 15px;">
            Use the verification code below to continue.
          </p>
        </div>

        <p style="margin: 0 0 18px; color: #374151; font-size: 16px;">
          Hi {{name}},
        </p>

        <p style="margin: 0 0 24px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          We received a request to reset the password for your TaskFlow account.
          Enter the following one-time password to continue:
        </p>

        <!-- OTP -->
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; min-width: 150px; padding: 18px 28px; background-color: #f3e8ff; border: 1px solid #e9d5ff; border-radius: 12px;">
            <span style="color: #6d28d9; font-size: 32px; font-weight: 700; letter-spacing: 8px;">
              {{otp}}
            </span>
          </div>
        </div>

        <div style="background-color: #f9fafb; border-radius: 10px; padding: 16px 18px; margin-top: 28px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
            This OTP is valid for <strong style="color: #374151;">10 minutes</strong>.
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 10px;">
        <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p style="margin: 0; color: #d1d5db; font-size: 12px;">
          This is an automated message. Please do not reply.
        </p>
      </div>

    </div>

  </div>

</body>
</html>
`;


export const passwordResetSuccessEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827;">

  <div style="padding: 40px 16px;">

    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 20px; font-weight: 700;">
          TaskFlow
        </div>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px 36px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: #ecfdf5; border-radius: 14px; font-size: 25px;">
            ✓
          </div>

          <h1 style="margin: 20px 0 8px; color: #111827; font-size: 27px; line-height: 1.3;">
            Password Reset Successful
          </h1>

          <p style="margin: 0; color: #6b7280; font-size: 15px;">
            Your account is ready to use again.
          </p>
        </div>

        <p style="margin: 0 0 18px; color: #374151; font-size: 16px;">
          Hi {{name}},
        </p>

        <p style="margin: 0 0 18px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Your TaskFlow password has been successfully reset.
        </p>

        <p style="margin: 0 0 28px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          You can now log in to your account using your new password and continue managing your tasks.
        </p>

        <!-- Success Notice -->
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; padding: 16px 18px; margin-bottom: 28px;">
          <p style="margin: 0; color: #047857; font-size: 14px; line-height: 1.6;">
            Your password has been updated successfully.
          </p>
        </div>

        <div style="background-color: #f9fafb; border-radius: 10px; padding: 16px 18px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
            If you did not make this change, please secure your account immediately.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 10px;">
        <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p style="margin: 0; color: #d1d5db; font-size: 12px;">
          This is an automated message. Please do not reply.
        </p>
      </div>

    </div>

  </div>

</body>
</html>
`;


export const emailVerificationOtp = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827;">

  <div style="padding: 40px 16px;">

    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 20px; font-weight: 700;">
          TaskFlow
        </div>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px 36px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: #f3e8ff; border-radius: 14px; font-size: 25px;">
            ✉️
          </div>

          <h1 style="margin: 20px 0 8px; color: #111827; font-size: 27px; line-height: 1.3;">
            Verify Your Email
          </h1>

          <p style="margin: 0; color: #6b7280; font-size: 15px;">
            One quick step to activate your account.
          </p>
        </div>

        <p style="margin: 0 0 18px; color: #374151; font-size: 16px;">
          Hi {{name}},
        </p>

        <p style="margin: 0 0 24px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Please use the verification code below to verify your email address and activate your TaskFlow account.
        </p>

        <!-- OTP -->
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; min-width: 150px; padding: 18px 28px; background-color: #f3e8ff; border: 1px solid #e9d5ff; border-radius: 12px;">
            <span style="color: #6d28d9; font-size: 32px; font-weight: 700; letter-spacing: 8px;">
              {{otp}}
            </span>
          </div>
        </div>

        <div style="background-color: #f9fafb; border-radius: 10px; padding: 16px 18px; margin-top: 28px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
            This OTP is valid for <strong style="color: #374151;">10 minutes</strong>.
            If you didn't request this verification code, you can safely ignore this email.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 10px;">
        <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p style="margin: 0; color: #d1d5db; font-size: 12px;">
          This is an automated message. Please do not reply.
        </p>
      </div>

    </div>

  </div>

</body>
</html>
`;


export const emailVerificationSuccess = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verified Successfully</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827;">

  <div style="padding: 40px 16px;">

    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 18px; border-radius: 10px; font-size: 20px; font-weight: 700;">
          TaskFlow
        </div>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px 36px;">

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background-color: #ecfdf5; border-radius: 14px; font-size: 25px;">
            ✓
          </div>

          <h1 style="margin: 20px 0 8px; color: #111827; font-size: 27px; line-height: 1.3;">
            Email Verified Successfully
          </h1>

          <p style="margin: 0; color: #6b7280; font-size: 15px;">
            Your TaskFlow account is now fully activated.
          </p>
        </div>

        <p style="margin: 0 0 18px; color: #374151; font-size: 16px;">
          Hi {{name}},
        </p>

        <p style="margin: 0 0 18px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Your email address has been successfully verified.
        </p>

        <p style="margin: 0 0 28px; color: #4b5563; font-size: 15px; line-height: 1.7;">
          Your TaskFlow account is now fully activated. You can start managing your tasks, organizing your work, and staying productive.
        </p>

        <!-- Success Notice -->
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 8px; padding: 16px 18px;">
          <p style="margin: 0; color: #047857; font-size: 14px; line-height: 1.6;">
            Your email has been verified and your account is ready to go.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 24px 10px;">
        <p style="margin: 0 0 8px; color: #9ca3af; font-size: 13px;">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p style="margin: 0; color: #d1d5db; font-size: 12px;">
          This is an automated message. Please do not reply.
        </p>
      </div>

    </div>

  </div>

</body>
</html>
`;