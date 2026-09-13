import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import transporter from "../config/nodemailer.js";
import {
  registrationEmail,
  passwordResetEmail,
  passwordResetSuccessEmail,
  emailVerificationOtp,
  emailVerificationSuccess,
} from "../config/emailTemplate.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account already exists with this email",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to TaskFlow",
        html: registrationEmail.replace("{{name}}", user.name),
      });

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    } catch (error) {
      return res.status(201).json({
        success: true,
        message:
          "Account created successfully, but we couldn't send the registration email.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function logOutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function isAuth(req, res) {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
}

async function getUserDetails(req, res) {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      isAccountVerified:user.isAccountVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
}

async function forgotpassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcryptjs.hash(otp, 10);
    user.passwordResetOtp = hashedOtp;
    user.passwordResetOtpExpiredAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: passwordResetEmail
        .replace("{{name}}", user.name)
        .replace("{{otp}}", otp),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function resetpassword(req, res) {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    if (Date.now() > user.passwordResetOtpExpiredAt) {
      return res.status(401).json({
        success: false,
        message: "OTP has expired",
      });
    }



  const hashedOtp = await bcryptjs.compare(otp, user.passwordResetOtp);

    if (user.passwordResetOtp === "" || !hashedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }



    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.passwordResetOtp = "";
    user.passwordResetOtpExpiredAt = 0;

    await user.save();

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Password Reset Successfully",
        html: passwordResetSuccessEmail.replace("{{name}}", user.name),
      });

      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
     
      return res.status(200).json({
        success: true,
        message:
          "Password reset successfully, but we couldn't send the confirmation email.",
      });
    }
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function sendEmailVerificationOtp(req, res) {
  const user = req.user;

  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const hashedOtp = await bcryptjs.hash(otp, 10);

    user.emailverificationOtp = hashedOtp;
    user.emailverificationOtpExpiredAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Email Verification OTP",
      html: emailVerificationOtp
        .replace("{{name}}", user.name)
        .replace("{{otp}}", otp),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function verifyEmailOtp(req, res) {
  const { otp } = req.body;
  const user = req.user;

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }

  try {
    if (Date.now() > user.emailverificationOtpExpiredAt) {
      return res.status(401).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const hashedOtp = await bcryptjs.compare(otp, user.emailverificationOtp);

    if (user.emailverificationOtp === "" || !hashedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    

    user.emailverificationOtp = "";
    user.emailverificationOtpExpiredAt = 0;
    user.isAccountVerified = true;

    await user.save();

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Email Verified Successfully",
        html: emailVerificationSuccess.replace("{{name}}", user.name),
      });

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res.status(200).json({
        success: true,
        message:
          "Email verified successfully, but we couldn't send the confirmation email.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default {
  registerUser,
  loginUser,
  logOutUser,
  isAuth,
  getUserDetails,
  forgotpassword,
  resetpassword,
  sendEmailVerificationOtp,
  verifyEmailOtp,
};
