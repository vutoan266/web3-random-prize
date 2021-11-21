import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  full_name: String,
  phone: String,
  is_paid: Boolean,
  wallet: String,
  created_at: Date,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
