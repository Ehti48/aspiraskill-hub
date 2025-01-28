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
        color: #252E4A99;
    }
    a{
        text-decoration: none;
        color: #252E4A99;
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
    background: #6AAA43;
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
    margin-bottom: 20px
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
    color: #767A7A;
    margin-bottom: 15px;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 12px 20px;
    background: #DEDEDE1A;
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
    color: #767A7A;
    cursor: pointer;

    input {
      width: auto;
      margin-right: -15px;
    }
  }
    .form-btns{
      margin-top: 40px;
      display: flex;
      justify-content: start;
      column-gap: 30px;
    }
  .accept-btn, .reject-btn {
    display: inline-block;
    padding: 8px 20px;
    background: #3282c4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
    .reject-btn{
      background: #6AAA43;
      border: 1px solid #6AAA43;
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
        <Link to="/admin/new-registration">Registeration</Link> <MdKeyboardArrowRight /> <span> {aspirant.id} </span>
      </div>
      <div className="registration-container">
        <form onSubmit={handleSubmit}>
          <div className="registration-header">
            <Heading title={` #${aspirant.id} - ${aspirant.fullName}`} />
            <button className="resume-btn">
              <div class="resume">
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/frame.svg" alt="" />
              </div>
              Resume</button>
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
                />
                <div className="date-icon">
                  <img src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png" alt="Calendar" />
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                  disabled={!isEditing}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                  disabled={!isEditing}
                />
                Female
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
              >
                <option value="">Select</option>
                <option value="Basic Web Technology">Basic Web Technology</option>
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
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
                style={{border: isEditing ? '1px solid rgb(193, 193, 193)' : '1px solid #dedede80'}}
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
                  onChange={handleChange}
                  checked={formData.mode === "On-site"}
                  disabled={!isEditing}
                />
                On-site
                <input
                  type="radio"
                  name="mode"
                  value="Remote"
                  onChange={handleChange}
                  checked={formData.mode === "Remote"}
                  disabled={!isEditing}
                />
                Remote
              </div>
            </div>
            <div className="form-group">
              <label>Session</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="session"
                  value="Full time"
                  onChange={handleChange}
                  checked={formData.session}
                  disabled={!isEditing}
                />
                Full time
                <input
                  type="radio"
                  name="session"
                  value="Part time"
                  onChange={handleChange}
                  checked={formData.session === "Part time"}
                  disabled={!isEditing}
                />
                Part time
              </div>
            </div>
            <div className="form-group">
              <label>System Facility</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="systemFacility"
                  value="Yes"
                  onChange={handleChange}
                  checked={formData.systemFacility === "Yes"}
                  disabled={!isEditing}
                />
                Yes
                <input
                  type="radio"
                  name="systemFacility"
                  value="No"
                  onChange={handleChange}
                  checked={formData.systemFacility === "No"}
                  disabled={!isEditing}
                />
                No
              </div>
            </div>
            <div className="form-group">
              <label>Currently Studying</label>
              <div className="radio-group">
                <input
                  type="radio"
                  name="currentlyStudying"
                  value="Yes"
                  onChange={handleChange}
                  checked={formData.currentlyStudying === "Yes"}
                  disabled={!isEditing}
                />
                Yes
                <input
                  type="radio"
                  name="currentlyStudying"
                  value="No"
                  onChange={handleChange}
                  checked={formData.currentlyStudying === "No"}
                  disabled={!isEditing}
                />
                No
              </div>
            </div>
          </div>

          <div className="form-btns">
            {isEditing ? (
              <>
                <button type="submit" className="accept-btn" onClick={handleSave}>
                  Save
                </button>
                <button type="button" className="reject-btn" onClick={handleCancel}>
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