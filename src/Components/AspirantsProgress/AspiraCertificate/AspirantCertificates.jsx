import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink, Link, useLocation } from 'react-router-dom';
import Button from '../../Button';
import { GrTechnology } from 'react-icons/gr';

const Wrapper = styled.section`
  .dateSec {
    width: 96%;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 1px rgba(6, 40, 61, 0.06);
  }

  .user-timesheet {
    padding: 10px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 50px;
    row-gap: 10px;
  }

  .ad-sck {
    margin: 25px 0;
    display: flex;
    list-style: none;
    align-items: center;

    li {
        font-size: 16px;
        font-weight: 500;
        color: #252e4a;
        a{
            color: #787E91;
            font-size: 18px;
            text-decoration: none;
            padding-right: 5px;
        }

        }
        svg {
            font-size: 30px;
            color: #252E4A99;
        }
  }

    .usertime-name {
        position: relative;
        color: #252E4A;
        font-size: 18px;
        font-weight: 600;

        &:before {
            position: absolute;
            content: '';
            width: 0px;
            height: 24px;
            border: 4px solid #6AAA43;
            left: -18px;
            top: -4px;
        }
    }

    .heading {
        height: 25px;
    }

    .container-2 {
      width: 100%;
    }

  .header {
    width: 100% !important;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    &.btm-header {
        margin: 20px 0 0 0;
        justify-content: flex-end;
    }
  }

  .searchBox {
    width: 120px;
    text-align: end;

    input {
      width: 100%;
      height: 36px;
      padding: 8px 10px;
      font-size: 16px;
      border: 1px solid #00000080;
      border-radius: 3px;
    }
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 100% !important;
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd1 {
    position: relative;
    top: 4px;
    color: #000000b0;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;
  }

  .stack-output {
    display: flex;
    align-items: center;

    p {
      padding-left: 10px;
    }

    button {
      margin-right: 15px;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        font-size: 24px;
      }
    }
  }

  .breadcrumb {
    margin: 10px 0;
    font-size: 16px;
    color: #666;
  }

  .breadcrumb a {
    color: #0078d7;
    text-decoration: none;
  }

  .container-2 {
    width: 100%;
  }

  .tab {
    overflow-x: auto;
  }  

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 95%;
    min-width: 900px;
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd {
    min-width: 770px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.3fr 1fr 1fr 1fr 0.7fr 0.5fr!important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    font-size: 14px;

    td {
      color: #252E4A;
      font-size: 14px;
      font-weight: 400;
      padding: 10px;
    }

    &.noData {
        grid-template-columns:1fr!important;
        text-align: center;
        
        p {
            color: #5F5F5F;
        }
    }
  }

  .odd1 {
    position: relative;
    top: 4px;
    color: #000000b0;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;

    td {
      color: #252E4A99;
      font-weight: 500;
    }
  }

  .stack-output {
    display: flex;
    align-items: center;

    p {
      padding-left: 10px;
    }

    button {
      margin-right: 15px;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        font-size: 24px;
      }
    }
  }

  .breadcrumb {
    margin: 10px 0;
    font-size: 16px;
    color: #666;
  }

  .breadcrumb a {
    color: #0078d7;
    text-decoration: none;
  }

  /* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;

  .heading {
  border-bottom: 1px solid #252e4a33;
  padding-bottom: 10px;
  min-height: 40px;
}

.cancelBtn {
    position: absolute;
    right: 20px;
    background: none;
    border: none;
    font-size: 20px;
    color: #252e4a99;
}
}

.form-group {
  display: flex;
  flex-wrap: wrap;

  .input-cont {
    width: 50%;
    padding: 10px;
    flex-grow: 1;

    label {
      display: block;
      color: #252E4A99;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}

/* Modal Input Fields */
.modal-content input, select {
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.modal-content input:focus {
  outline: none;
  border-color: #3282c4;
}

/* Modal Actions (Buttons) */
.modal-actions {
  margin: 15px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.modal-actions button:hover {
  opacity: 0.8;
}

.modal-actions button:first-child {
  background-color: #f0f0f000;
  border: 2px solid #3282c4;
  color: #3282c4;
  }
  
  .modal-actions button:last-child {
  background-color: #3282c4;
  color: white;
  }

  .upload-img {
        position: relative;
        width: 240px;
        border-radius: 5px;

    .updated-addImage, .updated-addImageMaterial {
      max-width: 100%;
      height: 100%;
      object-fit: contain;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .addImage {
      height: 100%;
      position: absolute;
      opacity: 0;
      top: 0;
    }

    .upload-content {
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 30px;
      border-radius: 5px;
      border: 2px dotted #3986c6;

      p {
        color: #3986c6;
      }
    }

    .edit-photo {
      width: 40px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    

    .editImage {
      position: absolute;
      top: 25px;
      height: 83%;
      opacity: 0;
    }
  }

  .delete-modal {
    max-width: 400px;

    .del-icon {
      width: 70px;
      height: 70px;
      background: #ff6b63;
      border-radius: 50%;
      padding: 17px;
      margin: 10px auto;
    }

    p {
      text-align: center;
      font-size: 16px;

      span {
        font-size: 14px;  
      }
    }

    .modal-actions {
      margin-bottom: 0;
      justify-content: center;

      button {
        width: 50%;  
      }
    }
  }

  @media screen and (max-width: 600px) {
    .form-group {
      gap: 10px;
    }
  }
  `;

const AspirantCertificates = () => {
  const location = useLocation();
  const studentId = location.state?.studentId;
  const studentName = location.state?.studentName;
  const aspirantId = location.state?.aspirantId;

  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    image: null,
    credential_id: "",
    course: "",
    issue_date: "",


  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  // Save the original credential id for update operations
  const [originalCredentialId, setOriginalCredentialId] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  // Fetch certificates on component mount or when studentId changes
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/aspirants-certificates/view/${studentId}`
        );
        if (!response.ok) throw new Error("Error fetching certificates");
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, [studentId]);

  // Open modal for Add or Edit
  const openModal = (certificate = null) => {
    if (certificate) {
      setEditMode(true);
      setSelectedCertificate(certificate);
      setOriginalCredentialId(certificate.credential_id); // Ensure this is set
      setFormData({ ...certificate });
    } else {
      setEditMode(false);
      setSelectedCertificate(null);
      setOriginalCredentialId("");
      setFormData({
        name: "",
        link: "",
        image: null,
        credential_id: "",
        course: "",
        issue_date: "",
      });
    }
    setIsModalOpen(true);
  };




  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedCertificate(null);
    setOriginalCredentialId("");
  };

  // Handle input value changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Ensures YYYY-MM-DD format
  };



  const handleAddOrUpdate = async () => {
    try {
      const url = editMode
        ? `http://localhost:3000/admin/aspirants-certificates/update/${selectedCertificate.id}`
        : "http://localhost:3000/admin/aspirants-certificates/create";
      const method = editMode ? "PUT" : "POST";
  
      // Ensure all required fields are included and formatted correctly
      const requestData = {
        ...formData,
        name: formData.name,
        link: formData.link,
        image: formData.image || null, // Set null if empty
        credential_id: Number(formData.credential_id), // Ensure it's a number
        course: formData.course,
        issue_date: formData.issue_date ? formatDate(formData.issue_date) : null, // Format issue_date
        user_id: studentId, // Ensure user_id is included
        technology_id: formData.technology_id || 1, // Default value if missing
      };
  
      console.log("Sending request to:", url);
      console.log("Request Data:", requestData);
      console.log("originalCredentialId:", originalCredentialId);
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      
      const responseData = await response.json();
      console.log("Response:", responseData);      
  
      if (!response.ok) {
        throw new Error(responseData.message || "Error saving certificate");
      }
  
      // Fetch updated certificates
      const updatedCertificates = await fetch(
        `http://localhost:3000/admin/aspirants-certificates/view/${studentId}`
      ).then((res) => res.json());
      
      setCertificates(updatedCertificates);      
  
    } catch (error) {
      console.error("Error saving certificate:", error.message);
    } finally {
      closeModal(); // Close the modal properly
    }
  };

  const handleDelete = async () => {
    if (!selectedCertificate) return;
  
    try {
      const response = await fetch(
        `http://localhost:3000/admin/aspirants-certificates/delete/${selectedCertificate.id}`, 
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        // Remove the certificate from the frontend state
        setCertificates((prev) =>
          prev.filter((cert) => cert.id !== selectedCertificate.id)
        );
        closeDeleteConfirmation();
      } else {
        console.error("Failed to delete the certificate");
      }
    } catch (error) {
      console.error("Error deleting the certificate:", error);
    }
  };
  



  const openDeleteConfirmation = (certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedCertificate(null);
  };

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter((certificate) => {
    const name = certificate.name?.toLowerCase() || "";
    const credId =
      certificate.credential_id?.toString().toLowerCase() || "";
    return (
      name.includes(searchQuery.toLowerCase()) ||
      credId.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Wrapper>
      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to="/admin/aspirants-progress?page=certificates">
                Certificates
              </Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {aspirantId}
            </li>
          </ol>
        </nav>
        <div className="usertime-id">
          <p className="usertime-name">
            Aspirant : {aspirantId} - {studentName}
          </p>
        </div>
      </div>
      <div className="dateSec">
        <div className="header">
          <Heading title="Certificates" />
          <Button onClick={() => openModal()}>+ Add Certificate</Button>
        </div>
        <div className="list-cont">
          <div className="container-2">
            <div className="header btm-header">
              <div className="searchBox">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="tab">
              <table className="tab-cols">
                <thead>
                  <tr className="odd odd1">
                    <td className="num">#</td>
                    <td>Certificate Name</td>
                    <td>Credential ID</td>
                    <td>Certificate Link</td>
                    <td>Issues on</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((certificate, index) => (
                      <tr className="odd" key={index}>
                        <td className="num">{index + 1}</td>
                        <td>{certificate.name}</td>
                        <td>{certificate.credential_id}</td>
                        <td className='cut-text'>{certificate.link}</td>
                        <td>
                          {new Date(certificate.issue_date).toLocaleDateString()}
                        </td>
                        <td className="stack-output">
                          <button onClick={() => openModal(certificate)}>
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png"
                              alt="Edit"
                            />
                          </button>
                          <button
                            onClick={() =>
                              openDeleteConfirmation(certificate)
                            }
                          >
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png"
                              alt="Delete"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="odd noData">
                      <td colSpan="6">No data available in table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editMode ? "Edit Certificate" : "Add Certificate"}</h3>
            <button className="cancelBtn" onClick={closeModal}>
              ✖
            </button>

            <div className="form-group">
              <div className="input-cont">
                <label htmlFor="name">Certificate Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter certificate name"
                />

                <label htmlFor="link">Certificate Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter link"
                />

                <div className="upload-img">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>

              <div className="input-cont">
                <label htmlFor="credential_id">Credential ID</label>
                <input
                  type="text"
                  name="credential_id"
                  value={formData.credential_id}
                  onChange={handleChange}
                  disabled={editMode} // prevent editing credential_id during update
                />

                <label htmlFor="Course">Select Course</label>
                <select
                  name="course"
                  id="Course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">Select course</option>
                  <option value="Basic Web Technology">
                    Basic Web Technology
                  </option>
                  <option value="React JS">React JS</option>
                  <option value="Flutter">Flutter</option>
                  <option value="ASP DotNet">ASP DotNet</option>
                </select>

                <label htmlFor="Issue Date">Issue Date</label>
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date ? formatDate(formData.issue_date) : ""} // Ensures correct format
                  onChange={(e) =>
                    setFormData({ ...formData, issue_date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleAddOrUpdate}>
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-hidden={!isDeleteConfirmationOpen}
          onClick={closeDeleteConfirmation} // Closes modal when clicking outside
        >
          <div
            className="modal-content delete-modal"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          >
            <div className="del-icon">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png" alt="delete" />
            </div>
            <p>Are you sure?<br />
              <span>you want to delete this certificate</span>
            </p>
            <div className="modal-actions">
              <button onClick={closeDeleteConfirmation}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </Wrapper>
  );
};

export default AspirantCertificates;
