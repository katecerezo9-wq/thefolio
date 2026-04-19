import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    ign: '',
    dob: '',
    skill: 'intermediate',
    terms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({ ...prev, skill: e.target.value }));
  };

  const validateRegister = () => {
    const newErrors = {};

    // Check Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "⚠ Full Name is required";
    }

    // Check IGN
    if (!formData.ign.trim()) {
      newErrors.ign = "⚠ IGN is required for squad linking";
    }

    // Check Date of Birth
    if (!formData.dob) {
      newErrors.dob = "⚠ Please select your birth date";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      
      if (age < 18) {
        newErrors.dob = "⚠ You must be 18 years or older to register";
      }
    }

    // Check Terms
    if (!formData.terms) {
      newErrors.terms = "⚠ You must accept the protocols";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Uplink Successful! Welcome to the team.");
      navigate('/home');
    }
  };

  return (
    <>
      <section className="about-hero animate-up">
        <h1>Join The Squad</h1>
        <p>Sign up to get updates on my tournaments and streams.</p>
      </section>

      <div className="register-layout">
        <div className="register-image animate-up">
          <img src="/assets/school_champs.jpg" alt="Kate Ann Gaming Setup" />
        </div>

        <div className="register-form-box animate-up">
          <form className="full-page-form" onSubmit={(e) => e.preventDefault()}>
            <label>Full Name:</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}

            <label>Preferred Username (IGN):</label>
            <input 
              type="text" 
              id="ign" 
              placeholder="Ex: KateGaming"
              value={formData.ign}
              onChange={handleChange}
              className={errors.ign ? 'input-error' : ''}
            />
            {errors.ign && <span className="error-msg">{errors.ign}</span>}

            <label>Date of Birth:</label>
            <input 
              type="date" 
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'input-error' : ''}
            />
            {errors.dob && <span className="error-msg">{errors.dob}</span>}
            
            <label>Skill Level:</label>
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
              />
              <label htmlFor="terms">I agree to the terms and conditions.</label>
              {errors.terms && <span className="error-msg">{errors.terms}</span>}
            </div>

            <button 
              type="button" 
              className="submit-btn" 
              onClick={validateRegister}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;