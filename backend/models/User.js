const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'member' },
  status: { type: String, default: 'active' },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' }
}, { timestamps: true });

// Simple password comparison (plain text)
userSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;
};

module.exports = mongoose.model('User', userSchema);