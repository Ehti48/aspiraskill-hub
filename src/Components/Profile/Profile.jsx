import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../Heading";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Wrapper = styled.section`
  /* General Styles */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f4f7fc;
  }

  .settings-container {
    display: flex;
  }

  /* Sidebar Styles */
  .sub-sidebar {
    width: 250px;
    background-color: #f8f9fa;
    border-right: 1px solid #eaeaea;
  }

  .sub-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sub-sidebar li {
    padding: 20px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #eaeaea;
  }


  .sub-sidebar li:hover {
    background-color: #e2e6ea;
  }

  /* Content Styles */
  .settings-content {
    flex: 1;
    padding: 20px 10px;
  }

  /* General Layout */
  .settings-container {
    display: flex;
    background: #f4f7fc;
  }

  .sub-sidebar {
    width: 16.5%;
    min-width: 160px;
    height: 80vh;
    background: white;
    color: white;
  }

  .sub-sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sub-sidebar li {
    padding: 14px 20px;
    cursor: pointer;
  }

  .sub-sidebar li.active {
    background: #3282c4;
    color: white;
  }

 

  /* General Section */
  .general-card,
  .security-card {
    background: white;
    border-radius: 6px;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .heading {
       
    h1 {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .profile {
    display: flex;
    align-items: center;
    margin: 30px 0;
  }
  .profile-image {
    width: 80px;
    height: 80px;
    background: #e4e6e7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  .profile-image img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  span.role {
    width: fit-content;
    margin-bottom: 10px;
    display: block;
    color: #6c9968;
    background: #dce7db;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 3px;
  }

  .photo-actions button {
    margin: 5px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
  }
form.general-form {
    margin-top: 20px;
}
  .general-form .form-group {
    width: 40%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
  }

  /* Buttons */
  .edit-btn,
  .cancel-btn,
  .save-btn {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  }

  .edit-btn {
    width: fit-content;
    background: #3282c4;
    color: white;
    display: flex;
    align-items: center;
    column-gap: 5px;

  }

  .cancel-btn {
    background: transparent;
    color: #3282c4;
    border: 1px solid #3282c4;
    font-size: 16px;
    font-weight: 500;
  }

  .save-btn {
    background: #3282c4;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  .photo-actions {
    display: flex;
    width: 180px;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 14px;
      cursor: pointer;
      color: #3282c4;
    }
  }
  .form-input {
    width: 100%;
    padding: 0;
    border-radius: 5px;
    display: flex;
    gap: 25px;

    label {
      padding-bottom: 16px;
      color: #767a7a;
      font-size: 16px;
      font-weight: 400;
    }

    input {
      padding: 10px 20px;
      border-radius: 6px;
      border: 1px solid #dedede;
      background: rgb(252 252 252);
      font-size: 16px;
      font-weight: 500;
      color: #545454;
    }
  }

  /* Security Section */
  .input-wrapper {
    display: flex;
    align-items: center;
  }

  .toggle-visibility {
    margin-left: 10px;
    cursor: pointer;
  }

  /* Security Section */
  /* Security Card Styling */
.security-card {
  max-width: 100%;
  margin: auto;
  background: #fff;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  form {
    margin-top: 20px;
  }
}

.security-card h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.security-card .form-group,
.security-card .change-password {
  margin-bottom: 10px;
  width: 325px;
}

.security-card label {
  font-size: 16px;
  padding: 0 0 16px;
  display: block;
  color: #767a7a;
  font-weight: 400;
}

.password-input {
  width: 325px;
  position: relative;
}

.password-input input {
  width: 100%;
  padding: 13px 40px 13px 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #545454;
}

.toggle-visibility {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-40%);
    cursor: pointer;
    font-size: 20px;
}

.security-card .change-password {
  width: 70%;
  display: flex;
  gap: 10px;
}

.changeForm {
  flex: 1;
  width: 325px;
}

/* Button Styling */
.btn {
  width: 200px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
small.error-message {
    color: red;
}

  /* Responsive Styles */
  @media (max-width: 1150px) {
    .settings-container {
      flex-direction: column;
    }

    .sub-sidebar ul {
      display: flex;
    }
  .current-input{
    width: 100%;
  }
 .general-form .form-group {
    width: 50%;
    margin-bottom: 15px;
    flex-direction: column;
    display: flex;
    gap: 10px;
}
    .sub-sidebar {
      width: 100%;
      height: auto;
    }
    .form-input input {
      max-width: 100%;
    }
      
    .photo-actions p {
      min-width: 100px;
    }
      .security-card .change-password {
      width: 100%;
  }
      .security-card .form-group,
      .security-card .change-password {
        margin-bottom: 20px;
        width: 100%;
      }
      .changeForm {
        margin:0; 

      input{
        width:100%
      }
    }

    .password-input {
      width: 350px;
      position: relative;
    }
  }
    @media (max-width: 900px){
        .password-input {
          width: 100%;
        }
    }
    @media (max-width: 650px){

    .security-card .form-group,
      .security-card .change-password {
        flex-direction: column;
        gap: 20px;
      }

      .password-input, .changeForm {
        width: 100%;
      }

      .form-input {
        flex-direction: column;
        width: 100%;
      }

      .form-group {
        width: 100% !important;
      }
    }
    @media (max-width:415px){
    .photo-actions{
      flex-wrap:wrap;
      }
      .settings-content{
      padding-top:10px;
      }
      .security-card .form-group{
      width:100%;
      }
}
    
      
}
`;

const Profile = () => {
  const [activeSection, setActiveSection] = useState("general");

  // State to manage the General section form
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Ehtishamul",
    lastName: "Haque",
    fullName: "Ehtishamul Haque",
  });
  const [originalData, setOriginalData] = useState({ ...formData });

  // State to manage the Security section form
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle editing mode for the General section
  const handleEditToggle = () => {
    if (isEditing) {
      setFormData(originalData); // Revert changes on cancel
    } else {
      setOriginalData(formData); // Save original data before editing
    }
    setIsEditing(!isEditing);
  };

  // Save changes in the General section
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData); // Mock save functionality
  };

  // Handle input changes in the General section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Validate the Security form inputs
  const validateSecurityForm = () => {
    const newErrors = {};

    if (!passwords.currentPassword) newErrors.currentPassword = "Current Password is Required";
    if (!passwords.newPassword) newErrors.newPassword = "New Password is Required";
    if (!passwords.confirmPassword) newErrors.confirmPassword = "Confirm Password is Required";
    if (
      passwords.newPassword &&
      passwords.confirmPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle password change submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (validateSecurityForm()) {
      alert("Password successfully changed!");
      console.log("Passwords:", passwords); // Mock save functionality
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  return (
    <Wrapper>
      <div className="settings-container">
        {/* Sidebar */}
        <div className="sub-sidebar">
          <ul>
            <li
              className={activeSection === "general" ? "active" : ""}
              onClick={() => setActiveSection("general")}
            >
              General
            </li>
            <li
              className={activeSection === "security" ? "active" : ""}
              onClick={() => setActiveSection("security")}
            >
              Security
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* General Section */}
          {activeSection === "general" && (
            <div className="general-section">
              <div className="general-card">
              <Heading title={"General Information"} />
                <div className="profile">
                  <div className="profile-image">
                  <img src="https://admin.aspiraskillhub.aspirasys.com/images/edit-profile-page.png" alt="" id="profileImagePreview"/>
                  </div>
                  <div className="profile-info">
                    <span className="role">ADMIN</span>
                    <Heading title={formData.fullName} className="admin-name"/>
                    {isEditing && (
                      <div className="photo-actions">
                        <p onClick={() => alert("Edit Photo")}>Edit Photo</p>
                        <p onClick={() => alert("Remove Photo")}>Remove Photo</p>
                      </div>
                    )}
                  </div>
                </div>
                <form className="general-form">
                  <div className="form-input">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  {isEditing ? (
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="save-btn"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={handleEditToggle}
                    >
                      <img src="https://admin.aspiraskillhub.aspirasys.com/images/edit-file.png"></img>
                      Edit
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="security-section">
              <div className="security-card">
                <Heading title={"Change Password"} />
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <div className={`password-input  ${errors.currentPassword ? "error" : ""}`}>
                      <input
                        type={showPassword.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        id="current-password"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        style={{
                          borderColor: errors.currentPassword ? "red" : "",
                          backgroundColor: errors.currentPassword ? "#ffcccc" : "",
                        }}
                      />
                      <i
                        className="toggle-visibility"
                        onClick={() => togglePasswordVisibility("currentPassword")}
                      >
                        {showPassword.currentPassword ? <FaEye/> : <FaEyeSlash/>}
                      </i>
                    </div>
                    {errors.currentPassword && (
                      <small className="error-message">{errors.currentPassword}</small>
                    )}
                  </div>
                  <div className="change-password">
                    <div className="changeForm">
                      <label htmlFor="new-password">New Password</label>
                      <div className={`password-input ${errors.newPassword ? "error" : "xfdsfsfs"}`}>
                        <input
                          type={showPassword.newPassword ? "text" : "password"}
                          name="newPassword"
                          id="new-password"
                          value={passwords.newPassword}
                          onChange={handlePasswordChange}
                          style={{
                            borderColor: errors.currentPassword ? "red" : "",
                            backgroundColor: errors.currentPassword ? "#ffcccc" : "",
                          }}
                        />
                        <i
                          className="toggle-visibility"
                          onClick={() => togglePasswordVisibility("newPassword")}
                        >
                          {showPassword.newPassword ? <FaEye/> : <FaEyeSlash/>}
                        </i>
                      </div>
                      {errors.newPassword && (
                        <small className="error-message">{errors.newPassword}</small>
                      )}
                    </div>
                    <div className="changeForm">
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <div className={`password-input ${errors.confirmPassword ? "error" : ""}`}>
                        <input
                          type={showPassword.confirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirm-password"
                          value={passwords.confirmPassword}
                          onChange={handlePasswordChange}
                          style={{
                            borderColor: errors.currentPassword ? "red" : "",
                            backgroundColor: errors.currentPassword ? "#ffcccc" : "",
                          }}
                        />
                        <i
                          className="toggle-visibility"
                          onClick={() => togglePasswordVisibility("confirmPassword")}
                        >
                          {showPassword.confirmPassword ? <FaEye/> : <FaEyeSlash/>}
                        </i>
                      </div>
                      {errors.confirmPassword && (
                        <small className="error-message">{errors.confirmPassword}</small>
                      )}
                    </div>
                  </div>
                  <div className="action-buttons">
                    {isEditing ? (
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={handleEditToggle}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="save-btn">
                          Change Password
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={handleEditToggle}
                      >
                        Change Password
                      </button>
                    )}

                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};


export default Profile;
