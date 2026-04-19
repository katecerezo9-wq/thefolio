import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (user?.role === 'admin') {
      setIsAdmin(true);
      fetchMessages();
    } else if (user) {
      // Pre-fill form if user is logged in
      setFormData({
        name: user.name || '',
        email: user.email || '',
        message: ''
      });
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get('/contact/messages');
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await API.post('/contact/send', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: user?._id || null
      });
      
      setSuccessMsg('Message sent successfully! Admin will respond soon.');
      setFormData(prev => ({ ...prev, message: '' }));
      setErrors({});
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/contact/messages/${id}/read`);
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await API.delete(`/contact/messages/${id}`);
        setMessages(messages.filter(m => m._id !== id));
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-wrapper">
        <h2>Send a Message</h2>
        {successMsg && <div className="contact-success">{successMsg}</div>}
        {errors.submit && <div className="contact-error">{errors.submit}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            rows="5" 
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'input-error' : ''}
          ></textarea>
          {errors.message && <span className="error-msg">{errors.message}</span>}
        </div>
        
        <button 
          type="button" 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      <div className="contact-info-wrapper">
        <h2>Contact Info</h2>
        <div className="contact-details">
          <p><strong>📍 Location:</strong> La Union, Philippines</p>
          <p><strong>📧 Email:</strong> katecerezo9@gmail.com</p>
          <p><strong>🎮 Discord:</strong> KateAnn#1234</p>
        </div>

        <h2>Follow Me</h2>
        <a href="https://www.facebook.com/share/1BxVLX8sg8/" target="_blank" rel="noopener noreferrer" className="socmed-btn fb">Facebook</a>
        <a href="https://www.instagram.com/youfound_katey?igsh=MW1wcWZ6bzh1NHRlZg==" target="_blank" rel="noopener noreferrer" className="socmed-btn ig">Instagram</a>
        <a href="https://www.tiktok.com/@keykkkkkyum?_r=1&_t=ZS-93A92aBHpVU" target="_blank" rel="noopener noreferrer" className="socmed-btn tt">TikTok</a>
      </div>

      {/* Admin Messages Panel */}
      {isAdmin && (
        <div className="admin-messages-panel">
          <h2>Messages from Members</h2>
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet.</p>
          ) : (
            <div className="messages-list">
              {messages.map(msg => (
                <div key={msg._id} className={`message-item ${!msg.isRead ? 'unread' : ''}`}>
                  <div className="message-header">
                    <div className="message-sender">
                      <strong>{msg.name}</strong>
                      <span className="message-email">({msg.email})</span>
                    </div>
                    <div className="message-date">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="message-body">
                    <p>{msg.message}</p>
                  </div>
                  <div className="message-actions">
                    {!msg.isRead && (
                      <button onClick={() => markAsRead(msg._id)} className="mark-read-btn">
                        Mark as Read
                      </button>
                    )}
                    <button onClick={() => deleteMessage(msg._id)} className="delete-msg-btn">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;