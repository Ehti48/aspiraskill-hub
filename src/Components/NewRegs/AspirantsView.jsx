import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../Heading";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Wrapper = styled.section`
  .breadCrumb {
    font-size: 18px !important;
    display: flex;
    align-items: center;
    padding: 20px 25px;
    margin-bottom: 10px;

    svg {
      font-size: 30px;
      color: #252e4a99;
    }
    a {
      text-decoration: none;
      color: #252e4a99;
    }
  }

  .heading h1 {
    color: #000;
    font-weight: 600;
  }

  .registration-container {
    width: 96%;
    margin: 0px auto;
  }

  .registration-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    border-bottom: 1px solid #252e4a33;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }

  .registration-header h2 {
    font-size: 18px;
  }

  .resume-btn {
    padding: 8px 20px;
    background: #6aaa43;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .resume {
    margin-right: 10px;
  }

  form {
    height: auto;
    margin: auto;
    background: #ffffff;
    border: 1px solid #252e4a1a;
    padding: 20px 30px 30px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }

  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }

  .form-group {
    flex: 1;
    min-width: 250px;
    margin-bottom: 15px;

    .date-form {
      max-width: 160px;
      position: relative;

      .date-icon {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 22px;
        bottom: 13px !important;
        background: white;
        pointer-events: none;
        bottom: 12px;
        display: flex;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .form-group label {
    display: block;
    font-weight: 400;
    color: #767a7a;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
  }

  .radioLabel {
    margin-bottom: 0px !important;
    font-size: 16px !important;
  }

  input,
  select {
    width: 100%;
    padding: 12px 20px;
    background: #dedede1a;
    color: #545454;
    font-size: 14px;
    border: 1px solid #dedede80;
    border-radius: 6px;
    outline: none;
    cursor: default;

    &option {
      color: #545454;
    }
  }

  .radio-group {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #767a7a;
    cursor: pointer;

    input {
      width: auto;
      margin-right: -15px;
    }
  }
  .form-btns {
    margin-top: 40px;
    display: flex;
    justify-content: start;
    column-gap: 30px;
  }
  .accept-btn,
  .reject-btn {
    display: inline-block;
    padding: 8px 20px;
    background: #3282c4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .reject-btn {
    background: #6aaa43;
    border: 1px solid #6aaa43;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 500px) {
    .heading h1 {
      font-size: 14px;
    }
  }
`;

function AspirantsView() {
  const location = useLocation();
  const aspirant = location.state?.aspirant;

  const [formData, setFormData] = useState({
    fullName: aspirant.fullName,
    firstName: aspirant.firstName,
    lastName: aspirant.lastName,
    doba: aspirant.dob,
    email: aspirant.email,
    mobile: aspirant.mobile,
    gender: aspirant.gender,
    techStack: aspirant.techStack,
    degree: aspirant.degree,
    linkedin: aspirant.linkedin,
    mode: aspirant.mode,
    session: aspirant.session,
    systemFacility: aspirant.systemFacility,
    currentlyStudying: aspirant.currentlyStudying,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAspirant = { ...aspirant, ...formData };
    console.log("Submitted Data:", updatedAspirant);
  };

  const handleEdit = () => {
    setFormData(aspirant);
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <div className="breadCrumb">
        <Link to="/admin/new-registration">Registeration</Link>{" "}
        <MdKeyboardArrowRight /> <span> {aspirant.id} </span>
      </div>
      <div className="registration-container">
        <form onSubmit={handleSubmit}>
          <div className="registration-header">
            <Heading title={` #${aspirant.id} - ${aspirant.fullName}`} />
            <button className="resume-btn">
              <div class="resume">
                <img
                  src="https://admin.aspiraskillhub.aspirasys.com/images/frame.svg"
                  alt=""
                />
              </div>
              Resume
            </button>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
            <div className="form-group">
              <div className="date-form">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.doba}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{
                    border: isEditing
                      ? "1px solid rgb(193, 193, 193)"
                      : "1px solid #dedede80",
                  }}
                />
                <div className="date-icon">
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png"
                    alt="Calendar"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="male">
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tech Stack</label>
              <select
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              >
                <option value="">Select</option>
                <option value="Basic Web Technology">
                  Basic Web Technology
                </option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                readOnly={!isEditing}
                style={{
                  border: isEditing
                    ? "1px solid rgb(193, 193, 193)"
                    : "1px solid #dedede80",
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mode</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="mode"
                  value="On-site"
                  id="onsite"
                  onChange={handleChange}
                  checked={formData.mode === "On-site"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="onsite">
                  On-site
                </label>
                <input
                  type="radio"
                  name="mode"
                  value="Remote"
                  id="remote"
                  onChange={handleChange}
                  checked={formData.mode === "Remote"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="remote">
                  Remote
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Session</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="session"
                  value="Full time"
                  id="fulltime"
                  onChange={handleChange}
                  checked={formData.session}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="fulltime">
                  Full time
                </label>
                <input
                  type="radio"
                  name="session"
                  value="Part time"
                  id="parttime"
                  onChange={handleChange}
                  checked={formData.session === "Part time"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="parttime">
                  Part time
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>System Facility</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="systemFacility"
                  value="Yes"
                  id="yes"
                  onChange={handleChange}
                  checked={formData.systemFacility === "Yes"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="yes">
                  Yes
                </label>
                <input
                  type="radio"
                  name="systemFacility"
                  value="No"
                  id="no"
                  onChange={handleChange}
                  checked={formData.systemFacility === "No"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="no">
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Currently Studying</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="currentlyStudying"
                  value="Yes"
                  id="yess"
                  onChange={handleChange}
                  checked={formData.currentlyStudying === "Yes"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="yess">
                  Yes
                </label>
                <input
                  type="radio"
                  name="currentlyStudying"
                  value="No"
                  id="nos"
                  onChange={handleChange}
                  checked={formData.currentlyStudying === "No"}
                  disabled={!isEditing}
                />
                <label className="radioLabel" htmlFor="nos">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="form-btns">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="accept-btn"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="reject-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="accept-btn">
                  Grant Access
                </button>
                <button type="reset" className="reject-btn">
                  Reject
                </button>
                <button className="accept-btn edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default AspirantsView;
