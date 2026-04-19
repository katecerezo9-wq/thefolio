const express = require('express');
const Contact = require('../models/contact');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const router = express.Router();

// Send message (public or logged in)
router.post('/send', async (req, res) => {
  const { name, email, message, userId } = req.body;
  
  console.log('Received message request:', { name, email, message, userId });
  
  try {
    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    const newMessage = await Contact.create({
      name,
      email,
      message,
      userId: userId || null
    });
    
    console.log('Message saved:', newMessage);
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get all messages (admin only)
router.get('/messages', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark message as read (admin only)
router.put('/messages/:id/read', protect, adminOnly, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    message.isRead = true;
    await message.save();
    res.json({ message: 'Marked as read', data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete message (admin only)
router.delete('/messages/:id', protect, adminOnly, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;