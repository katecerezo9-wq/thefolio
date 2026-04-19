import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateContact = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "⚠ Name is required";
    }
    if (!formData.email.includes('@')) {
      newErrors.email = "⚠ Valid email required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "⚠ Message cannot be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Message Sent Successfully!");
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <section className="about-hero animate-up">
        <h1>Contact & Resources</h1>
        <p>Let's connect or check out these tools.</p>
      </section>

      <div className="contact-container animate-up">
        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form id="contactForm" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
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
              ></textarea>
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>
            <button type="button" className="submit-btn" onClick={validateContact}>
              Submit Message
            </button>
          </form>
        </div>

        <div className="contact-info-wrapper">
          <h2>Resources</h2>
          <table className="resource-table">
            <thead>
              <tr><th>Resource Name</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>Mobile Legends</td><td>Official game website.</td></tr>
              <tr><td>Liquipedia</td><td>Tournament brackets.</td></tr>
              <tr><td>TikTok</td><td>Content creation platform.</td></tr>
            </tbody>
          </table>

          <h2>Our Location</h2>
          <div className="map-placeholder">
            <p>Map Placeholder: La Union, Philippines</p>
          </div>

          <h2>Follow Me</h2>
          <a 
            href="https://www.facebook.com/share/1BxVLX8sg8/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="socmed-btn fb"
          >
            Facebook
          </a>
          <a 
            href="https://www.instagram.com/youfound_katey?igsh=MW1wcWZ6bzh1NHRlZg==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="socmed-btn ig"
          >
            Instagram
          </a>
          <a 
            href="https://www.tiktok.com/@keykkkkkyum?_r=1&_t=ZS-93A92aBHpVU" 
            target="_blank" 
            rel="noopener noreferrer"
            className="socmed-btn tt"
          >
            TikTok
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;