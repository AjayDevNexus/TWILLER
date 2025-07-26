import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from '../../context/firbase';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Restpass.css';

const Restpass = () => {
  const [userEmail, setUserEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [Password, setpassword]=useState('');
  const auth = getAuth();
  useEffect(() => {
    let genpassword = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 10; i++) {
    genpassword = genpassword +  letters[Math.floor(Math.random() * letters.length)];
  }
setpassword(genpassword);
  },[]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');

    if (!userEmail.includes('@')) {
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/resetpassword', {
        email: userEmail,
      });

      if (!response.data.success) {
        setFeedbackMessage(response.data.message || 'You can only request a password reset once per day.');
        return;
      }

      await sendPasswordResetEmail(auth, userEmail);

      setFeedbackMessage('Password reset email sent! Check your inbox.');
      setUserEmail('');
      setpassword()

    } catch (error) {
      setFeedbackMessage('Something went wrong.');
    }
  };

  return (
      <div className="container">
        <form onSubmit={handleFormSubmit} className="form">
          <h2 className="header">Reset Your Password</h2>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
            className="input"
            required
          />
          <button type="submit" className="button">Send Reset Email</button>
          {feedbackMessage && <p className="message">{feedbackMessage}</p>}
          {Password&& <p className="message">{Password}</p>}
          <br></br>
           GO To
          <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: "var(--twitter-color)",
          fontWeight: "600",
          marginLeft: "5px",
        }}
      >
        Log In
      </Link>
        </form>
          
      </div>
      
  );
};

export default Restpass;