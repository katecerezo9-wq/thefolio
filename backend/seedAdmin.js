require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    // Delete existing admin if any
    await User.deleteMany({ email: 'admin@thefolio.com' });
    
    // Create admin account with plain text password
    const admin = new User({
      name: 'Admin',
      email: 'admin@thefolio.com',
      password: 'Admin@012345',  // Changed to Admin@012345
      role: 'admin',
      status: 'active',
      bio: 'System Administrator',
      profilePic: ''
    });

    await admin.save();

    console.log('✅ Admin account created successfully!');
    console.log('📧 Email: admin@thefolio.com');
    console.log('🔑 Password: Admin@012345');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();