import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.section`
/* Container setup */
.login-container {
    display: flex;
    height: 100vh;
    width: 100%;
  }
  
  /* Left section for illustration */
  .login-illustration {
    flex: 1;
    background: #f4faff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
.illustration-content {
  width: 100%;
  background: url(https://admin.aspiraskillhub.aspirasys.com/images/admin-login.png);
  background-repeat: no-repeat;
  background-size: 105%;
  background-position: bottom;
  background-color: #3282c4;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
  
  .illustration-img {
    width: 100%;
    height: 100%;
    background-color: #f4faff;
  }
  
  /* Right section for form */
  .login-form-container {
    flex: 1;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Form styling */
  .login-form {
    width: 100%;
    max-width: 340px;
    padding: 24px;
    text-align: center;
  }
  
  .company-logo {
    width: 150px;
    margin-bottom: 20px;
  }
  
  h2 {
    margin: 20px 0;
    font-size: 22px;
    font-weight: 600;
    color: #282828;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 18px;
    margin-bottom: 15px;
    color: #282828;
  }
  
  input {
    width: 100%;
    padding: 16px 20px;
    background: #dedede1a;
    border: 1px solid #dedede;
    border-radius: 6px;
    outline: none;
    font-size: 16px;

    &:focus {
      border-color: #007bff;
      background-color: #f4faff;
    }

    &::placeholder {
      color: #282828;
    }
  }
  
  .password-container {
    position: relative;
  }
  
  .password-input {
    width: 100%;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  .forgot-password {
    text-align: center;
    margin: 5px 0;
  }

  .forgot-password a {
    text-decoration: none;
    color: #282828;
    font-size: 14px;
  }
  
  .login-button {
    width: 100%;
    padding: 16px 20px;
    background: rgb(50 130 196);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  /* Responsiveness for smaller screens */
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
  
    .login-illustration {
      display: none !important;
    }
  }

/* Additional styles for error input */
.input-error {
  border: 1px solid red;
  background: #ffe6e6;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
`;

const Reset = ({ onLogout }) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear old messages
    setErrors({ email: "" });

    if (!email.trim()) {
        setErrors({ email: "Email is required." });
        return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrors({ email: "Enter a valid email address." });
        return;
    }

    try {
        console.log("Sending request to server with email:", email);
        const response = await fetch("http://localhost:5000/api/admin/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log("Server response:", data);

        if (response.ok) {
            setSuccessMessage("Password reset link sent successfully.");
            setEmail("");
        } else {
            setErrors({ email: data.error || "Something went wrong." });
        }
    } catch (error) {
        console.error("Error:", error);
        setErrors({ email: "Server error. Please try again later." });
    }
};

  return (
    <Wrapper>
      <div className="login-container">
        <div className="login-illustration">
          <div className="illustration-content"></div>
        </div>

        <div className="login-form-container">
          <div className="login-form">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-Mail Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <button type="submit" className="login-button">
                Send Password Reset Link
              </button>
              <div className="forgot-password">
                {onLogout && <Link onClick={onLogout}>Back to Login</Link>}
              </div>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Reset;