import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink, Link, useLocation } from 'react-router-dom';
import Button from '../../Button';

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
  height: 500px;
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
  gap: 10px;

  .input-cont {
    width: 50%;
    padding: 10px;

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

  `;

const AspirantCertificates = () => {
  const [studentsCertify, setStudentsCertify] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    cName: "",
    cId: "",
    cLink: "",
    issues: "",
    image: null,
  });


  // Load students from localStorage on component mount
  useEffect(() => {
    const storedStudents = localStorage.getItem("studentsCertify");
    if (storedStudents) {
      setStudentsCertify(JSON.parse(storedStudents));
    }
  }, []);

  // Save students to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("studentsCertify", JSON.stringify(studentsCertify));
  }, [studentsCertify]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredStudents = studentsCertify.filter((student) => {
    const name = student.cName || ""; // Default to an empty string if undefined
    const issue = student.issues || ""; // Default to an empty string if undefined
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const openModal = (student = null) => {
    if (student) {
      setEditMode(true);
      setSelectedStudent(student);
      setFormData({
        cName: student.cName,
        cId: student.cId,
        cLink: student.cLink,
        issues: student.issues,
      });
    } else {
      setEditMode(false);
      setFormData({ cName: "", cId: "", cLink: "", issues: "" });
    }
    setIsModalOpen(true);
    document.openModal.style.transition = "all 0.3s ease-in-out";
  };

  const closeModal = () => setIsModalOpen(false);
  const closeDeleteConfirmation = () => setIsDeleteConfirmationOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editMode && selectedStudent) {
      setStudentsCertify(
        studentsCertify.map((student) =>
          student.cId === selectedStudent.cId ? { ...formData } : student
        )
      );
    } else {
      setStudentsCertify([...studentsCertify, formData]);
    }
    closeModal();
  };  

  const handleDelete = (studentId) => {
    setIsDeleteConfirmationOpen(true);
    setSelectedStudent(studentsCertify.find((student) => student.cId === studentId));
  };

  const confirmDelete = () => {
    setStudentsCertify(studentsCertify.filter((student) => student.cId !== selectedStudent.cId));
    closeDeleteConfirmation();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result, // Store base64-encoded image
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };


  const location = useLocation();
  const studentId = location.state?.studentId;
  const studentName = location.state?.studentName;
  
  return (
    <Wrapper>
      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to={{ pathname: "/admin/aspirants-progress", search: "?page=certificates" }}>Certificates</Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {studentId}
            </li>
          </ol>
        </nav>
        <div className="usertime-id">
          <p className="usertime-name">Aspirant : {studentId} - {studentName}</p>
        </div>
      </div>
      <div className="dateSec">
        <div className="header">
          <Heading title="Certificates" />
          <Button onClick={() => openModal()}>+ Add Certificates</Button>
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
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr className="odd" key={index}>
                        <td className="num">{index + 1}</td>
                        <td>{student.cName}</td>
                        <td>{student.cId}</td>
                        <td>{student.cLink}</td>
                        <td>{student.issues}</td>
                        <td className="stack-output">
                          <button onClick={() => openModal(student)}>
                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png" />
                          </button>
                          <button onClick={() => handleDelete(student.cId)}>
                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png" />
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Heading title={editMode ? "Edit Certificate" : "Certificate"} />
            <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>✖</button>
            <div className="form-group">
              <div className="input-cont">
                <label htmlFor="cName">Certificate Name</label>
                <input
                  type="text"
                  name="cName"
                  value={formData.cName}
                  onChange={handleChange}
                  placeholder="Enter certificate name"
                />

                <label htmlFor="cLink">Certificate Link</label>
                <input
                  type="text"
                  name="cLink"
                  value={formData.cLink}
                  onChange={handleChange}
                  placeholder="Enter link"
                />

                <div class="upload-img">
                  <label htmlFor="image">Upload Image</label>
                  <input type="file" name="image" accept="image/*" className='addImage' onChange={handleImageChange} />
                  {formData.image && <img src={formData.image} alt="Preview" className="preview-image" />}
                  <div class="upload-content tech-old-addImage">
                    <div class="edit-photo">
                      <img src="https://admin.aspiraskillhub.aspirasys.com/images/profile-upload.png" alt="profile" />
                    </div>
                    <p class="font-16 fw_500"> Upload image</p>
                  </div>
                  <input type="file" name="image" class="input d-none addImage" id="addImage" required="" />
                  <div class="invalid-feedback teck_image py-2"></div>
                </div>
              </div>
              <div className="input-cont">
                <label htmlFor="cId">Credential ID</label>
                <input
                  type="text"
                  name="cId"
                  value={formData.cId || 20258}
                  onChange={handleChange}
                />
                <label htmlFor="Course">Select course</label>
                <select name="Course" id="Course">
                  <option value="Select course">Select course</option>
                  <option value="Basic Web Technology">Basic Web Technology</option>
                  <option value="React JS">React JS</option>
                  <option value="Flutter">Flutter</option>
                  <option value="ASP DotNet">ASP DotNet</option>
                </select>
                <label htmlFor="issues">Issues on</label>
                <input
                  type="date"
                  name="issues"
                  value={formData.issues}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSubmit}>
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this certificate?</h3>
            <div className="modal-actions">
              <button onClick={closeDeleteConfirmation}>Cancel</button>
              <button onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AspirantCertificates;
