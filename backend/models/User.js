const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true },
    photo: { type: String },
    role: { type: String, enum: ["STUDENT", "TEACHER"], default: "TEACHER" },
    specialisation: { type: String, default: "" },
    skillSet: { type: [String], default: [] },
    certification: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
