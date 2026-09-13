import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authMiddleware.authUser, authController.logOutUser);
authRouter.get("/isAuth", authMiddleware.authUser, authController.isAuth);

authRouter.get(
  "/getUserDetails",
  authMiddleware.authUser,
  authController.getUserDetails,
);

authRouter.post("/forgot-password", authController.forgotpassword);
authRouter.post("/reset-password", authController.resetpassword);

authRouter.post(
  "/send-email-verification-otp",
  authMiddleware.authUser,
  authController.sendEmailVerificationOtp,
);
authRouter.post(
  "/verify-email",
  authMiddleware.authUser,
  authController.verifyEmailOtp,
);

export default authRouter;
