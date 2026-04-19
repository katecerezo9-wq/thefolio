import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    skill: 'intermediate',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({
      ...prev,
      skill: e.target.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (!formData.dob) newErrors.dob = 'Birth date required';
    else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 18) newErrors.dob = 'Must be 18 or older';
    }
    if (!formData.terms) newErrors.terms = 'Accept terms to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await API.post('/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      
      setSuccessMsg('Registration successful! Please login to continue.');
      setSubmitError('');
      
      // Clear form
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        dob: '',
        skill: 'intermediate',
        terms: false
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Registration failed');
      setSuccessMsg('');
    }
  };

  return (
    <>
      <section className="about-hero animate-up">
        <h1>Join The Squad</h1>
        <p>Sign up to get updates on my tournaments and streams.</p>
      </section>

      {submitError && <div className="register-error-msg">{submitError}</div>}
      {successMsg && <div className="register-success-msg">{successMsg}</div>}

      <div className="register-layout">
        <div className="register-image animate-up">
          <img src="/assets/school_champs.jpg" alt="Kate Ann Gaming Setup" />
        </div>

        <div className="register-form-box animate-up">
          <form className="full-page-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            
            <label>Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}

            <label>Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-msg">{errors.username}</span>}

            <label>Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}

            <label>Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="error-msg">{errors.password}</span>}

            <label>Date of Birth</label>
            <input 
              type="date" 
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'input-error' : ''}
            />
            {errors.dob && <span className="error-msg">{errors.dob}</span>}
            
            <label>Skill Level</label>
            <div className="radio-group">
              <input 
                type="radio" 
                id="beginner" 
                name="skill" 
                value="beginner"
                checked={formData.skill === 'beginner'}
                onChange={handleRadioChange}
              />
              <label htmlFor="beginner">Beginner</label>
              
              <input 
                type="radio" 
                id="intermediate" 
                name="skill" 
                value="intermediate"
                checked={formData.skill === 'intermediate'}
                onChange={handleRadioChange}
              />
              <label htmlFor="intermediate">Intermediate</label>
              
              <input 
                type="radio" 
                id="expert" 
                name="skill" 
                value="expert"
                checked={formData.skill === 'expert'}
                onChange={handleRadioChange}
              />
              <label htmlFor="expert">Expert</label>
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className={errors.terms ? 'input-error' : ''}
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
              {errors.terms && <span className="error-msg">{errors.terms}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;