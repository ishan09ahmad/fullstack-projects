import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetOtp: {
    type: String,
    default: "",
  },
  passwordResetOtpExpiredAt: {
    type: Number,
    default: 0,
  },
  emailverificationOtp: {
    type: String,
    default: "",
  },
  emailverificationOtpExpiredAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const userModel = mongoose.model("user", userSchema);
export default userModel;
