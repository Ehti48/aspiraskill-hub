import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  max-width: 400px;
  padding: 20px;
  text-align: center;
}

.company-logo {
  width: 150px;
  margin-bottom: 20px;
}

h2 {
  margin: 20px 0;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
  color: #282828;
}

input {
  width: 100%;
  padding: 16px 20px;
  background-color: #dedede1a;
  border: 1px solid #dedede;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3282c4;
  }
}

.password-container {
  position: relative;
}

.password-input {
  width: 100%;
}

.password-toggle {
  height: 18px;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.forgot-password {
  margin-bottom: 15px;
  margin-top: -15px;
  text-align: right;
}

.forgot-password a {
  text-decoration: none;
  color: #282828;
  font-size: 18px;
}

.login-button {
  width: 100%;
  padding: 16px 20px;
  background: rgb(50 130 196);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 5px;
}

.create-account {
  letter-spacing: 1px;

  a {
    text-decoration: none;
    color: #282828;
    font-size: 18px;
  }
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

const Login = ({ onLogin, onReset }) => {
  // Set fixed dummy credentials as initial state
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test123");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Check against fixed credentials
      if (email === "test@example.com" && password === "test123") {
        // Simulate successful login
        const dummyToken = "dummy_jwt_token";
        localStorage.setItem("token", dummyToken);
        onLogin(dummyToken);
        navigate("/");
      } else {
        setErrors({ password: "Invalid credentials - use test@example.com / test123" });
      }
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
            <div className="logo">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/Logo.png"
                alt="logo"
              />
            </div>
            <h2>Login Your Account</h2>
            <div className="dummy-hint" style={{ marginBottom: '1rem', color: '#666' }}>
              Use test@example.com / test123
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Admin ID</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-field ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className={`password-input ${errors.password ? "input-error" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="forgot-password">
                <Link to="/reset">Forgot Password?</Link>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

// const Login = ({ onLogin, onReset }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const newErrors = {};
//     if (!email) newErrors.email = "Email is required.";
//     if (!password) newErrors.password = "Password is required.";
  
//     setErrors(newErrors);
  
//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const response = await axios.post("http://localhost:48857/api/admin/login", {
//           email,
//           password
//         });
  
//         // Axios puts response data in response.data
//         const data = response.data;
        
//         // Check for successful status code
//         if (response.status !== 200) {
//           throw new Error(data.error || "Login failed.");
//         }
  
//         localStorage.setItem("token", data.token);
//         onLogin(data.token);
//         navigate("/");
//       } catch (error) {
//         // Axios wraps errors, use error.response for server errors
//         const errorMessage = error.response?.data?.error || error.message;
//         setErrors({ password: errorMessage });
//       }
//     }
//   };

//   return (
//     <Wrapper>
//       <div className="login-container">
//         {/* Left illustration section */}
//         <div className="login-illustration">
//           <div className="illustration-content"></div>
//         </div>

//         {/* Login form */}
//         <div className="login-form-container">
//           <div className="login-form">
//             <div className="logo">
//               <img
//                 src="https://admin.aspiraskillhub.aspirasys.com/images/Logo.png"
//                 alt="logo"
//               />
//             </div>
//             <h2>Login Your Account</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="email">Admin ID</label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`input-field ${errors.email ? "input-error" : ""}`}
//                 />
//                 {errors.email && <p className="error-message">{errors.email}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="password-container">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Password"
//                     className={`password-input ${errors.password ? "input-error" : ""}`}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                 </div>
//                 {errors.password && <p className="error-message">{errors.password}</p>}
//               </div>
//               <div className="forgot-password">
//                 <Link to="/reset">Forgot Password?</Link>
//               </div>
//               <button type="submit" className="login-button">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Login;