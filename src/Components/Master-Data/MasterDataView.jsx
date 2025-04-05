import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Heading from "../../Components/Heading";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Wrapper = styled.section`
  /* General styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7fc;
  }

  .breadCrumb {
    margin: 5px 0 28px 10px;
    font-size: 18px !important;
    display: flex;
    align-items: center;

    svg {
      font-size: 30px;
      color: #252e4a99;
    }
    a {
      text-decoration: none;
      color: #252e4a99;
    }
  }

  .profile-container {
    margin: 0 auto;
    padding: 20px;
  }

  .heading {
    h1 {
      font-size: 18px;
      font-weight: 600;
    }
  }

  h1 {
    font-size: 24px;
  }

  h3 {
    padding-bottom: 10px;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
  }

  .docHead {
    padding-bottom: 10px;
    border-bottom: 1px solid #dedada;
  }

  /* Profile Layout */
  .profile-content {
    display: flex;
    flex-wrap: wrap;
  }

  /* Left Section */
  .profile-left {
    flex: 1 0 auto;
    min-width: 245px;
    margin-bottom: 20px;
    padding: 0 10px;
  }

  .profile-card {
    background: white;
    padding: 20px 30px;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    h6 {
      font-size: 14px;
      font-weight: 400;
      color: #333335;
    }

    p {
      margin-top: 5px;
      font-size: 14px;
      color: #767a7a;
    }
  }

  .avatar-placeholder {
    width: 80px;
    height: 80px;
    background: #ccc;
    margin: 0 auto 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .profile-info {
    background: white;
    padding: 20px 0;
    margin-top: 20px;
    border: none;
    border-top: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 600px;
  }
  .profile-social {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    text-align: start;
    width: 100%;

    .social-icons {
      display: flex;
      justify-content: space-between;
      width: 65%;
      margin: 10px 0;
    }
    strong {
      width: 100%;
      text-align: start;
      font-size: 16px !important;
      font-weight: 600 !important;
    }

    img {
      cursor: pointer;
    }
  }
  .profile-info p {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: left;
    color: #767a7a;
  }
  .profile-info strong {
    margin-bottom: 5px;
    color: #333335;
    font-size: 14px;
    font-weight: 500;
  }
  /* Right Section */
  .profile-right {
    flex: 1 0 auto;
    width: 75%;
    padding: 0 10px;
  }
  .profile-date {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    flex-wrap: wrap;
    gap: 10px;

    p {
      font-size: 14px !important;
    }

    strong {
      margin-right: 5px;
      font-weight: 600;
      color: #2d3748;
    }
  }
  .profile-data {
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
  }
  .profile-data p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #767a7a;
    font-size: 13px !important;
    font-weight: 400;
  }

  .profile-data strong {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .about-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .about-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    .para {
      width: 80%;
      font-size: 14px;
      font-weight: 400;
      color: #767a7a;
    }
  }
  .about-section,
  .documents-section {
    background: white;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    a {
      margin: 0 10px;
      font-size: 14px;
      font-weight: 400;
      color: #767a7a;
      text-decoration: none;
    }
  }

  .resume-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;
    background: #6aaa43;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    img {
      margin-right: 10px;
    }
  }

  .documents-list {
    width: 100%;
    display: flex;
    padding: 20px 0 0;
    justify-content: start;
    margin: 10px 0;
    gap: 10px;
    flex-wrap: wrap;

    .list {
      width: 200px;
      margin: 0 10px;

      h6 {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 500;
        color: #333335;
      }

      .actionBtn {
        margin-left: 10px;
      }
    }

    p {
      width: auto;
      display: flex;
      justify-content: start;
      align-items: center;
    }
    .job-status {
      color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: start;
      align-items: center;

      label {
        margin: 0 10px;
        color: #767a7a;
      }
      input {
        width: 20px;
        height: 20px;
      }
    }
    .job-edit,
    .job-save,
    .job-cancel {
      margin-right: 10px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background: #3282c4;
      color: white;
      cursor: pointer;
    }
  }

  /* Responsive */
  @media (max-width: 1119px) {
    .profile-left {
      max-width: 100% !important;
    }
    .profile-social .social-icons {
      display: flex;
      width: 100%;
      gap: 20px;
      justify-content: start;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    .profile-content {
      flex-direction: column;
    }

    .profile-left,
    .profile-right {
      width: 100%;
    }

    .about-section .para {
      margin-top: 10px !important; 
    } 
  }
`;
const MasterDataView = () => {
  const location = useLocation();
  console.log("Location Object:", location);  // Debugging

  const { aspirantId, userId, techName, formattedData } = location.state || {};  // Safe destructuring

  console.log("Aspirant ID:", aspirantId);
  console.log("User ID:", userId);
  console.log("Formatted Data:", formattedData);

  const [aspirant, setAspirant] = useState(() => {
    // ✅ Safely get data from location.state
    const { formattedData } = location.state || {};
    return formattedData || {}; // Fallback to empty object
  });

  useEffect(() => {
    // ✅ Only fetch if userId exists AND formattedData wasn't passed
    if (userId && !location.state?.formattedData) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/admin/masterdata/view/${userId}`);
          console.log("API Response:", res.data); // Debug API data
          setAspirant(res.data);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchData();
    }
  }, [userId, location.state]); // ✅ Add location.state to dependencies

  const idToStatusMap = {
    0: "Terminated",
    1: "Hired",
    2: "In Progress",
    3: "Job Ready",
  };

  const profileData = {
    id: aspirant?.aspirant_id || "N/A",
    name: aspirant?.first_name || "N/A", // ✅ Use first_name directly (logs show last_name is null)
    role: aspirant?.designation === null ? "React Js" : "Unknown" || "N/A",
    employment: aspirant?.mode === "1" ? "Full-time" : "Remote",
    gender: aspirant?.gender || "N/A",
    dob: aspirant?.dob ? new Date(aspirant.dob).toLocaleDateString() : "N/A",
    fatherName: aspirant?.parent_name || "N/A",
    education: aspirant?.graduation_details || "N/A",
    experience: aspirant?.experience || "0 months",
    joiningDate: aspirant?.join_date ? new Date(aspirant.join_date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "N/A",
    contact: aspirant?.mobile_no || "N/A",
    contact_parent: aspirant?.parent_mobile_no || "N/A",
    email: aspirant?.personal_email || "N/A",
    address: aspirant?.address || "N/A",
    documents: {
      aadhar: aspirant?.aadharcard_doc || "Not available",
      pan: aspirant?.pancard_doc || "Not available",
    },
    about: aspirant?.description || "No description available",
    jobStatus: aspirant?.status || "Unknown", // ✅ Use `status` (already mapped in formattedData)
    social: {
      linkedIn: aspirant?.linkedIn_id || null,
      github: aspirant?.gitHub_id || null,
    },
  };

  // State for managing Job Status editing
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(profileData.jobStatus);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSaveClick = async () => {
    try {
      // ✅ Find the numeric status key (e.g., "Hired" → 1)
      const statusKey = Object.keys(idToStatusMap).find(
        (key) => idToStatusMap[key] === selectedStatus
      );

      await axios.patch(
        `http://localhost:5000/admin/masterdata/update/${userId}`,
        { job_status: statusKey }
      );

      // ✅ Refresh data after update
      const response = await axios.get(
        `http://localhost:5000/admin/masterdata/view/${userId}`
      );
      setAspirant(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("jobStatus", selectedStatus);
    }
  }, [selectedStatus]);

  return (
    <Wrapper>
      {!aspirant?.aspirant_id ? (
        <div>No aspirant data found for ID: {userId || "Unknown"}</div>
      ) : (
        <div className="profile-container">
          <div className="breadCrumb">
            <Link to="/admin/master-data"> Master Data </Link>{" "}
            <MdKeyboardArrowRight /> <span> {aspirant.aspirant_id} </span>
          </div>
          <div className="profile-content">
            {/* Left Section */}
            <div className="profile-left">
              <div className="profile-card">
                <div className="avatar-placeholder">
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/no-image.png"
                    alt=""
                  />
                </div>
                <Heading title={aspirant.first_name} />
                <h6>{techName}</h6>
                <p>{profileData.employment}</p>
                <div className="profile-info">
                  <h3>Profile Information</h3>
                  <p>
                    <strong>Gender:</strong> {profileData.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {profileData.dob}
                  </p>
                  <p>
                    <strong>Father's Name:</strong> {profileData.fatherName}
                  </p>
                  <p>
                    <strong>Education:</strong> {profileData.education}
                  </p>
                  <p>
                    <strong>Experience (in month):</strong>{" "}
                    {profileData.experience}
                  </p>
                  <p className="profile-social">
                    <strong>Social:</strong>
                    <div className="social-icons">
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/linkedin.png"
                        alt=""
                      />
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/instagram.png"
                        alt=""
                      />
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/github.png"
                        alt=""
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="profile-right">
              <div className="about-section">
                <div className="about-header">
                  <h3>About</h3>
                  <button className="resume-btn">
                    <img
                      src="https://admin.aspiraskillhub.aspirasys.com/images/frame.svg"
                      alt=""
                    />
                    Resume
                  </button>
                </div>
                <p className="para">{profileData.about}</p>
                <div className="profile-date">
                  <p>
                    <strong>Date of Joining :</strong> {profileData.joiningDate}
                  </p>
                  <p>
                    <strong>Date of End :</strong> -
                  </p>
                </div>
                <div className="profile-data">
                  <p>
                    <strong>
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/phone.png"
                        alt=""
                      />
                    </strong>{" "}
                    {profileData.contact}
                  </p>
                  <p>
                    <strong>
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/email.png"
                        alt=""
                      />
                    </strong>{" "}
                    {aspirant.personal_email}
                  </p>
                  <p>
                    <strong>
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/location.png"
                        alt=""
                      />
                    </strong>{" "}
                    {aspirant.address}
                  </p>
                  <p>
                    <strong>
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/call.png"
                        alt=""
                      />
                    </strong>{" "}
                    {profileData.contact_parent}
                  </p>
                </div>
              </div>
              <div className="documents-section">
                <h3 className="docHead">Documents</h3>
                <div className="documents-list">
                  <div className="list">
                    <h6>Aadhar Card</h6>
                    <p>
                      <strong>
                        <img
                          src="https://admin.aspiraskillhub.aspirasys.com/images/pdf.png"
                          alt=""
                        />
                      </strong>
                      <a download>{profileData.documents.aadhar}
                        <img
                          className="actionBtn"
                          src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
                          alt=""
                        />
                      </a>
                    </p>
                  </div>
                  <div className="list">
                    <h6>Pan Card</h6>
                    <p>
                      <strong>
                        <img
                          src="https://admin.aspiraskillhub.aspirasys.com/images/pdf.png"
                          alt=""
                        />
                      </strong>{" "}
                      <a download>{profileData.documents.pan}
                        <img
                          className="actionBtn"
                          src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
                          alt=""
                        />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="documents-section">
                <h3>Job Status</h3>
                <div className="documents-list">
                  {Object.values(idToStatusMap).map((status) => (
                    <p className="job-status" key={status}>
                      <input
                        type="radio"
                        value={status}
                        id={status}
                        disabled={!isEditing}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      />
                      <label htmlFor={status}>{status}</label>
                    </p>
                  ))}

                  {!isEditing ? (
                    <button className="job-edit" onClick={handleEditClick}>
                      Edit
                    </button>
                  ) : (
                    <div>
                      <button className="job-save" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button className="job-cancel" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default MasterDataView;
