import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Heading from "../Heading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ProgressLoader from "../ProgressLoader";

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

  i {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-40%);
  }
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
  const [isLoading, setIsLoading] = useState(true);

  // State for profile data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "", // Add this field
  });

  const [originalData, setOriginalData] = useState({ ...formData });
  const [isEditing, setIsEditing] = useState(false);

  // State for security section
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Fetch profile data on component mount

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const userId = localStorage.getItem("user_id"); // ✅ Fix: Correct key for user ID
    const roleId = localStorage.getItem("role_id");

    console.log("User ID:", userId);
    console.log("Role ID:", roleId);

    if (roleId !== "1") { // Ensure it's a string if stored as string
      alert("Access denied. You are not an admin.");
      return;
    }

    try {
      const response = await axios.get(`https://api.aspiraskillhub.aspirasys.com/admin/profile/view/${userId}`);

      console.log("API Response:", response.data);

      if (response.data) {
        const { name = "", email = "", role_id } = response.data;
        const [firstName = "", lastName = ""] = name.split(" ");

        setFormData({ firstName, lastName, name, email, role_id });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsLoading(false);
    }
  };


  // Toggle editing mode
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

    const userId = localStorage.getItem("user_id");
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      alert("User ID not found. Please log in again.");
      return;
    }
    // Create updated payload
    const payload = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
    };

    // Remove unnecessary fields (if backend doesn't accept them)
    delete payload.firstName;
    delete payload.lastName;

    axios
      .put(`https://api.aspiraskillhub.aspirasys.com/admin/profile/edit/${userId}`, payload)
      .then((response) => {
        // Update the name field in the state
        setFormData((prevData) => ({
          ...prevData,
          name: `${prevData.firstName} ${prevData.lastName}`.trim(),
        }));
        setIsEditing(false);
        // Update local storage
        localStorage.setItem("username", payload.name);
        localStorage.setItem("email", payload.email);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        }
      });
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
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Validate the Security form inputs
  const validateSecurityForm = () => {
    const newErrors = {};
    if (!passwords.currentPassword) newErrors.currentPassword = "Current Password is Required";
    if (!passwords.newPassword) newErrors.newPassword = "New Password is Required";
    if (!passwords.confirmPassword) newErrors.confirmPassword = "Confirm Password is Required";
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password change submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
  
    if (!userId) {
      console.error("User ID not found in localStorage");
      alert("User ID not found. Please log in again.");
      return;
    }
    if (validateSecurityForm()) {
      axios
        .put(`https://api.aspiraskillhub.aspirasys.com/admin/profile/change-password/${userId}`, passwords)
        .then(() => {
          alert("Password successfully changed!");
          setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
          setErrors({});
        })
        .catch((error) => console.error("Error changing password:", error));
    }
  };

  // Render loading state while data is being fetched
  if (isLoading) {
    return <ProgressLoader delay={2000} />;
  }

  return (
    <Wrapper>
      <div className="settings-container">
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

        <div className="settings-content">
          {activeSection === "general" && (
            <div className="general-section">
              <div className="general-card">
                <Heading title={"General Information"} />
                <div className="profile">
                  <div className="profile-image">
                    <img
                      src="https://admin.aspiraskillhub.aspirasys.com/images/edit-profile-page.png"
                      alt="Profile"
                    />
                  </div>
                  <div className="profile-info">
                    <span className="role">{formData.role_id === 1 ? "ADMIN" : "USER"}</span>
                    <Heading title={formData.name} className="profile-name" />

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
                    {/* <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                      />
                    </div> */}
                  </div>
                  {isEditing ? (
                    <div className="action-buttons">
                      <button type="button" className="cancel-btn" onClick={handleEditToggle}>
                        Cancel
                      </button>
                      <button type="button" className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="edit-btn" onClick={handleEditToggle}>
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/edit-file.png"
                        alt="Edit"
                      />
                      Edit
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="security-section">
              <div className="security-card">
                <Heading title={"Change Password"} />
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className={`password-input ${errors.currentPassword ? "error" : ""}`}>
                      <input
                        type={showPassword.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <i onClick={() => togglePasswordVisibility("currentPassword")}>
                        {showPassword.currentPassword ? <FaEye /> : <FaEyeSlash />}
                      </i>
                    </div>
                    {errors.currentPassword && (
                      <small className="error-message">{errors.currentPassword}</small>
                    )}
                  </div>

                  <div className="change-password">
                    <div className="changeForm">
                      <label>New Password</label>
                      <div className={`password-input ${errors.newPassword ? "error" : ""}`}>
                        <input
                          type={showPassword.newPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwords.newPassword}
                          onChange={handlePasswordChange}
                        />
                        <i onClick={() => togglePasswordVisibility("newPassword")}>
                          {showPassword.newPassword ? <FaEye /> : <FaEyeSlash />}
                        </i>
                      </div>
                      {errors.newPassword && (
                        <small className="error-message">{errors.newPassword}</small>
                      )}
                    </div>

                    <div className="changeForm">
                      <label>Confirm New Password</label>
                      <div className={`password-input ${errors.confirmPassword ? "error" : ""}`}>
                        <input
                          type={showPassword.confirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwords.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                        <i onClick={() => togglePasswordVisibility("confirmPassword")}>
                          {showPassword.confirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </i>
                      </div>
                      {errors.confirmPassword && (
                        <small className="error-message">{errors.confirmPassword}</small>
                      )}
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button type="submit" className="save-btn">
                      Change Password
                    </button>
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
