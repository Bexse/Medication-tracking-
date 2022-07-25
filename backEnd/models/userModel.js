const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, required:true },
    email: { type: String, required:true, unique: true },
    password: { type: String, required:true },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
