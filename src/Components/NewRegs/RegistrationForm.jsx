import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: #3282c4;
  z-index: 10000;
}

.container {
    border-radius: 20px;
    margin: 20px auto;
    max-width: 1160px;
    padding: clamp(20px, 3vw, 40px);
    width: 90%;
    background: #fff;
}

h2 {
  text-align: start;
  margin-bottom: 20px;
}

.form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  flex-wrap: wrap;
}

.form-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 0 auto;
}

.form-group {
  width: 100%;
  height: 100px;
  padding: 10px 0;
  margin-bottom: 0;
}

.radio-btns {
  height: 40px;
  width: auto;
}

input[type="radio"] {
  width: 25px;
}

input.error,
select.error,
textarea.error {
  background-color: #ffe6e6;
  border: 1px solid #ff0000;
}

label {
  display: block;
  margin-bottom: 14px;
  color: #767a7a;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

input,
select {
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fcfcfc;
}

button {
  padding: 6px 30px;
  background-color: #3282c4;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color:rgb(59, 138, 203);
}

.form-btns {
  height: 100px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex: 0;
}

p {
  color: #ee716b;
  font-size: 11px;
}

.radio-group {
  background-color: #fff;
  width: 100%;
  height: 20px;
  display: flex;
  gap: 10px;
}

.radio-text {
    font-size: 15px;
    color: #454545;
    font-weight: 400;
    width: 100%;
    text-align: start;
}

.radio-group label {
  margin: 0;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

@media screen and (max-width: 1200px) {
.container{
    width: -webkit-fill-available;
}
.form{
width: auto;
align-items: start;
padding: 20px;

}
  .form-row {
    grid-template-columns: 300px 300px 300px;
    margin: 0;
    width: auto;
  }
    .form-btns {
    width: 87%;
     margin: 0;
    padding: 0px;
}
}
@media (max-width: 1030px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    width: auto;
  }
}
@media screen and (max-width: 550px) {
 .form-row {
    grid-template-columns: 1fr;
}
}
`;
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Email: "",
    MobileNumber: "",
    JoinDate: "",
    FatherName: "",
    FatherMobile: "",
    LastGraduation: "",
    Technology: "",
    Resume: null,
    Gender: "",
    Mode: "",
    CurrentlyWorking: "",
    SystemFacility: "",
    Linkedin: "",
    Session: "",
  });

  const [errors, setErrors] = useState({});
  const input = document.querySelector(".form input");
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Clear errors for the field if it's filled
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    let formErrors = {};
    const inputFields = document.querySelectorAll("input, select, textarea");

    // Loop through all input fields
    inputFields.forEach((field) => {
      if (field.type !== "radio" && !formData[field.name]) {
        // For non-radio fields
        formErrors[field.name] = `${field.name.replace(
          /([A-Z])/g,
          " $1"
        )} is required`;
        field.classList.add("error"); // Add error class to invalid fields
      } else if (field.type !== "radio") {
        field.classList.remove("error"); // Remove error class if valid
      }
    });

    // Validate radio groups separately
    const radioGroups = [
      "Gender",
      "Mode",
      "Session",
      "CurrentlyWorking",
      "SystemFacility",
    ];
    radioGroups.forEach((groupName) => {
      const radios = document.querySelectorAll(`input[name="${groupName}"]`);
      const isChecked = Array.from(radios).some((radio) => radio.checked); // Check if any radio is selected
      if (!isChecked) {
        formErrors[groupName] = `${groupName.replace(
          /([A-Z])/g,
          " $1"
        )} is required`;
        // Add an error class to the first radio of the group for visual indication
        if (radios.length > 0) {
          radios[0].parentElement.classList.add("error");
        }
      } else {
        // Remove the error class if valid
        radios.forEach((radio) =>
          radio.parentElement.classList.remove("error")
        );
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully");
    }
  };

  return (
    <Wrapper>
      <div className="wrapper">
        <div className="container">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit} className="form">
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                />
                {errors.FirstName && <p>{errors.FirstName}</p>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                />
                {errors.LastName && <p>{errors.LastName}</p>}
              </div>
              <div className="form-group">
                <label>Date Of Birth</label>
                <input type="date" name="DateOfBirth" onChange={handleChange} />
                {errors.DateOfBirth && <p>{errors.DateOfBirth}</p>}
              </div>
              {/* </div> */}

              {/* Row 2 */}
              {/* <div className="form-row"> */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="Email"
                  name="Email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
                {errors.Email && <p>{errors.Email}</p>}
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="number"
                  name="MobileNumber"
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                />
                {errors.MobileNumber && <p>{errors.MobileNumber}</p>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Gender"
                      value="Male"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Male</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Gender"
                      value="Female"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Female</p>
                  </label>
                </div>
                {errors.Gender && <p>{errors.Gender}</p>}
              </div>
              {/* </div> */}

              {/* Row 3 */}
              {/* <div className="form-row"> */}
              <div className="form-group">
                <label>Join Date</label>
                <input type="date" name="JoinDate" onChange={handleChange} />
                {errors.JoinDate && <p>{errors.JoinDate}</p>}
              </div>
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="FatherName"
                  placeholder="Enter Father's Name"
                  onChange={handleChange}
                />
                {errors.FatherName && <p>{errors.FatherName}</p>}
              </div>
              <div className="form-group">
                <label>Father's Mobile Number</label>
                <input
                  type="tel"
                  name="FatherMobile"
                  placeholder="Enter Father's Mobile Number"
                  onChange={handleChange}
                />
                {errors.FatherMobile && <p>{errors.FatherMobile}</p>}
              </div>
              {/* </div> */}

              {/* Row 4 */}
              {/* <div className="form-row"> */}
              <div className="form-group">
                <label>Last Graduation</label>
                <input
                  type="text"
                  name="LastGraduation"
                  placeholder="Enter Last Graduation"
                  onChange={handleChange}
                />
                {errors.LastGraduation && <p>{errors.LastGraduation}</p>}
              </div>
              <div className="form-group">
                <label>Technology</label>
                <select name="Technology" onChange={handleChange}>
                  <option value="">Select The Technology</option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                  <option value="Vue">Vue</option>
                </select>
                {errors.Technology && <p>{errors.Technology}</p>}
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="Linkedin"
                  placeholder="Enter LinkedIn"
                  onChange={handleChange}
                />
                {errors.Linkedin && <p>{errors.Linkedin}</p>}
              </div>
              {/* </div> */}

              {/* Row 5 */}
              {/* <div className="form-row"> */}
              <div className="form-group">
                <label>Resume</label>
                <input type="file" name="Resume" onChange={handleChange} />
                {errors.Resume && <p>{errors.Resume}</p>}
              </div>
              <div className="form-group">
                <label>Mode</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Mode"
                      value="On-site"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">On-site</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Mode"
                      value="Remote"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Remote</p>
                  </label>
                </div>
                {errors.Mode && <p>{errors.Mode}</p>}
              </div>
              <div className="form-group">
                <label>Session</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Session"
                      value="Full-time"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Full-time</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="Session"
                      value="Part-time"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Part-time</p>
                  </label>
                </div>
                {errors.Session && <p>{errors.Session}</p>}
              </div>
              {/* </div> */}

              {/* Row 6 */}
              {/* <div className="form-row"> */}
              <div className="form-group">
                <label>Currently Working</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="CurrentlyWorking"
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Yes</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="CurrentlyWorking"
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">No</p>
                  </label>
                </div>
                {errors.CurrentlyWorking && <p>{errors.CurrentlyWorking}</p>}
              </div>
              <div className="form-group">
                <label>System Facility</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="SystemFacility"
                      value="Yes"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">Yes</p>
                  </label>
                  <label>
                    <input
                      type="radio"
                      className="radio-btns"
                      name="SystemFacility"
                      value="No"
                      onChange={handleChange}
                    />{" "}
                    <p className="radio-text">No</p>
                  </label>
                </div>
                {errors.SystemFacility && <p>{errors.SystemFacility}</p>}
              </div>
            </div>

            <div className="form-btns">
              <button type="reset">Cancel</button>
              <button type="submit"
              >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegistrationForm;