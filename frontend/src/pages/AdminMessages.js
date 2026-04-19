import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get('/contact/messages');
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
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

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="admin-messages-container">
      <h2>Messages from Members</h2>
      
      {messages.length === 0 ? (
        <div className="no-messages">
          <div className="empty-icon">📭</div>
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map(msg => (
            <div key={msg._id} className={`message-card ${!msg.isRead ? 'unread' : ''}`}>
              <div className="message-card-header">
                <div className="sender-info">
                  <strong>{msg.name}</strong>
                  <span className="sender-email">({msg.email})</span>
                </div>
                <div className="message-date">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="message-card-body">
                <p>{msg.message}</p>
              </div>
              <div className="message-card-actions">
                {!msg.isRead && (
                  <button onClick={() => markAsRead(msg._id)} className="mark-read-btn">
                    Mark as Read
                  </button>
                )}
                <button onClick={() => deleteMessage(msg._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;