import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Heading from '../../../Components/Heading';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Button from '../../../Components/Button';
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';

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
  }

  .ad-sck {
    margin: 25px 0;
    display: flex;
    list-style: none;
    align-items: center;

    svg {
        font-size: 30px;
        color: #252E4A99;
    }

    li {
        font-size: 18px;
        font-weight: 500;
        color: #252e4a;
        a{
            color: #787E91;
            font-size: 18px;
            text-decoration: none;
            padding-right: 5px;
        }
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
    flex-wrap: wrap;
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
      font-size: 18px;
      border: 1px solid #00000080;
      border-radius: 3px;
    }
  }

  .tab {
    overflow-x: auto;
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 100% !important;
    min-width: 900px;
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd {
    min-width: 770px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr 1.5fr 0.5fr 0.5fr 0.5fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;

    td {
      padding: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #252e4a;
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
      font-weight: 500;
      color: #252e4a99;
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

  .container-2 {
    width: 100%;
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 95%;
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd1 {
    position: relative;
    top: 4px;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;
    
    td {
      font-size: 14px !important;
      color: #252E4A99;
    }
  }

  .odd2 {
    grid-template-columns: 1fr !important;
    place-items: center;

    td {
      font-size: 16px !important;
      color: #252E4A99;
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

 .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 500px;
    max-width: 90%;
    height: auto;
    align-items: start;
    justify-content: space-between;
    flex-direction: column;

    &.delete {
      max-width: 400px;
      display: flex;
      align-items: center;
    }

    label {
      color: #252e4a99;
      font-size: 16px;
    }
  }

  .view-modal {
    flex-direction: column !important;
    height: auto !important;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .modal-header {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #252e4a40;

    button {
      font-family: "Poppins", sans-serif;
      cursor: pointer;
      font-size: 16px;
      font-weight: 400;
      background: none;
      color: #252e4a99;
      border: none;
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }

  .delete {
    margin-bottom: 0 !important;
    border: none !important;
  }

  .del-icon {
    width: 70px;
    height: 70px;
    background: #ff6b63;
    border-radius: 50%;
    padding: 17px;
    margin: 10px auto;
  }

  .input-group {
    width: 100%;
  }

  .modal-detail {
    width: 100%;
    line-height: 3.5;
    padding: 0 10px;
    li {
      list-style-type: none;
      font-size: 14px;
      color: #252E4A99;
      width: 350px;
      max-width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        margin: 0 20px;
      }
    }
  }

  .modal-footer {
    width: 100%;
    margin: 25px 0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    &.delete {
      border: none !important;
      margin: 20px 0 0 0;
      justify-content: center;
      gap: 30px;
    }
  }

  .modal select {
    width: 100%;
    padding: 10px;
    margin: 0 0 15px 0;
    outline: none;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: -10px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }


  @media (min-width: 1350px) {
    .odd {
      font-size: 16px;
    }
  }

  @media (max-width: 660px) {
    .user-timesheet {
      align-items: start;
      flex-direction: column;
    }
  }
`;


const AspirantTecnology = () => {
  const [tech, setTech] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTech, setNewTech] = useState({
    techName: '',
    techId: '',
    stages: '',
    projects: '',
    materials: '',
    language_id: ''
  });
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [techIdError, setTechIdError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const studentId = location.state?.studentId;
  const studentName = location.state?.studentName;
  const userId = location.state?.userId;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.aspiraskillhub.aspirasys.com/api/admin/aspirant/${userId}/technologies`
        );

        console.log("API Full Response:", response);

        if (!response.data || !Array.isArray(response.data)) {
          console.error("Unexpected API response format:", response.data);
          return;
        }

        setTech(response.data);
      } catch (err) {
        console.error("Error fetching technologies:", err.message);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const [availableTechnologies, setAvailableTechnologies] = useState([]);

  useEffect(() => {
    const fetchAvailableTechnologies = async () => {
      try {
        const response = await axios.get('https://api.aspiraskillhub.aspirasys.com/admin/technologies');
        setAvailableTechnologies(response.data);
      } catch (error) {
        console.error('Error fetching available technologies:', error);
      }
    };

    fetchAvailableTechnologies();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleTechChange = async (e) => {
    const selectedTechName = e.target.value;
    const selectedTech = availableTechnologies.find((tech) => tech.name === selectedTechName);

    if (!selectedTech) return;

    const techId = selectedTech.id;

    // Update the newTech state with the selected technology info
    setNewTech({
      ...newTech,
      techName: selectedTechName,
      techId: techId,
    });

    // Only fetch additional details if we have both techId and language_id
    if (techId && newTech.language_id) {
      try {
        const response = await axios.get(
          `https://api.aspiraskillhub.aspirasys.com/api/admin/technology/${techId}/language/${newTech.language_id}/details`
        );

        const { no_stages, total_projects, total_materials } = response.data;

        setNewTech(prev => ({
          ...prev,
          stages: no_stages,
          projects: total_projects,
          materials: total_materials,
        }));
      } catch (error) {
        console.error("Error fetching technology details:", error);
      }
    }
  };

  const handleLanguageChange = async (e) => {
    const language_id = Number(e.target.value);
    
    setNewTech(prev => ({
      ...prev,
      language_id: language_id
    }));

    // Only fetch additional details if we have both techId and language_id
    if (newTech.techId && language_id) {
      try {
        const response = await axios.get(
          `https://api.aspiraskillhub.aspirasys.com/api/admin/technology/${newTech.techId}/language/${language_id}/details`
        );

        const { no_stages, total_projects, total_materials } = response.data;

        setNewTech(prev => ({
          ...prev,
          stages: no_stages,
          projects: total_projects,
          materials: total_materials,
        }));
      } catch (error) {
        console.error("Error fetching technology details:", error);
      }
    }
  };

  const handleAddTrainingPlan = async () => {
    if (!newTech.techName) {
      alert("Please select a technology");
      return;
    }

    if (!newTech.language_id) {
      alert("Please select a language");
      return;
    }

    try {
      const requestData = {
        technology_id: newTech.techId,
        language_id: newTech.language_id,
      };

      // Make the POST request
      const response = await axios.post(
        `https://api.aspiraskillhub.aspirasys.com/api/admin/aspirant/${userId}/technologies`,
        requestData
      );

      if (response.status === 201 || response.status === 200) {
        // Refresh the technologies list
        const updatedResponse = await axios.get(
          `https://api.aspiraskillhub.aspirasys.com/api/admin/aspirant/${userId}/technologies`
        );

        // Update the local state with the new data
        setTech(updatedResponse.data);

        // Reset the form
        setNewTech({
          techName: "",
          techId: "",
          stages: "",
          projects: "",
          materials: "",
          language_id: ""
        });

        // Close the modal
        setIsModalOpen(false);
      } else {
        alert("Failed to add training plan. Please try again.");
      }
    } catch (error) {
      console.error("Error adding training plan:", error);
      alert(
        `Error adding training plan: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setNewTech({
      techName: "",
      techId: "",
      stages: "",
      projects: "",
      materials: "",
      language_id: ""
    });
  };

  const handleDelete = async () => {
    try {
      if (deleteIndex === null || !tech[deleteIndex]) {
        alert("Error: No technology selected for deletion");
        setIsDeleteModalOpen(false);
        return;
      }

      await axios.delete(
        `https://api.aspiraskillhub.aspirasys.com/api/admin/aspirant/${userId}/technologies/${tech[deleteIndex].technology_id}`
      );

      const updatedTech = tech.filter((_, i) => i !== deleteIndex);
      setTech(updatedTech);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting technology:", error);
      alert(
        `Error deleting technology: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const filteredTech = tech.filter(
    (t) =>
      (t.technology_id && String(t.technology_id).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.technology && t.technology.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pages = Math.ceil(filteredTech.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredTech.slice(start, end);

  return (
    <Wrapper>
      {isModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <div className="modal-header">
              <Heading title='Training Material' />
              <button onClick={handleCancel}>✖</button>
            </div>
            {techIdError && <p className="error-message">{techIdError}</p>}
            <div className="input-group">
              <label htmlFor="techName">Technology Name</label>
              <select
                name="techName"
                id="techName"
                value={newTech.techName}
                onChange={handleTechChange}
              >
                <option value="">Select Technology Name</option>
                {availableTechnologies.map((tech) => (
                  <option key={tech.id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="language">Language</label>
              <select
                name="language"
                id="language"
                value={newTech.language_id}
                onChange={handleLanguageChange}
                required
              >
                <option value="">Select Language</option>
                <option value="1">English</option>
                <option value="2">Tamil</option>
                <option value="3">Hindi</option>
              </select>
            </div>
            <div className="modal-detail">
              <li>
                Technology Name <span>:</span> {newTech.techName || 'NA'}
              </li>
              <li>
                Total Stages <span>:</span> {newTech.stages || 'NA'}
              </li>
              <li>
                Total Projects <span>:</span> {newTech.projects || 'NA'}
              </li>
              <li>
                Total Material <span>:</span> {newTech.materials || 'NA'}
              </li>
            </div>
            <div className="modal-footer">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleAddTrainingPlan}>Add</Button>
            </div>
          </div>
        </>
      )}
      {isDeleteModalOpen && (
        <>
          <div className="overlay" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="modal delete">
            <div className="modal-header delete">
              <button onClick={() => setIsDeleteModalOpen(false)}>✖</button>
            </div>
            <div className="del-icon">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png" alt="delete" />
            </div>
            <p>Are you sure?</p>
            <span>To delete {tech[deleteIndex]?.technology || 'this technology'}?</span>
            <div className="modal-footer delete">
              <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </>
      )}

      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to={{ pathname: "/admin/aspirants-progress", search: "?page=trainingPlan" }}>
                Training Plan
              </Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {studentId}
            </li>
          </ol>
        </nav>
        <div className="usertime-id">
          <p className="usertime-name">
            Aspirant : {studentId} - {studentName}
          </p>
        </div>
      </div>
      <div className="dateSec">
        <div className="header">
          <Heading title="Training Plan" />
          <Button onClick={() => setIsModalOpen(true)}>+ Add Training Plan</Button>
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
                    <td>Technology ID</td>
                    <td>Technology Name</td>
                    <td>Stages</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {tech.length > 0 ? (
                    paginatedTechStacks.map((tech, index) => (
                      <tr className="odd" key={index}>
                        <td className="num">{(currentPage - 1) * 10 + index + 1}</td>
                        <td>{`ASPT${String(tech.technology_id).padStart(4, '0')}`}</td>
                        <td>{tech.technology}</td>
                        <td>{tech.no_stages}</td>
                        <td>{tech.completion_percentage}</td>
                        <td className="stack-output">
                          <NavLink
                            to="/admin/aspirants-progress/stages"
                            state={{
                              techId: tech.technology_id,
                              techName: tech.technology,
                              studentId: studentId,
                              userId: userId,
                            }}
                          >
                            <button>
                              <img
                                src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png"
                                alt="view"
                              />
                            </button>
                          </NavLink>
                          <button onClick={() => openDeleteModal(index)}>
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png"
                              alt="delete"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="odd odd2">
                      <td colSpan="7">No data available in the table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {tech.length > 10 && (
          <div className="pagination">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: currentPage === i + 1 ? '#3282c4' : 'transparent',
                  color: currentPage === i + 1 ? 'white' : '#3282c4',
                  cursor: 'pointer',
                  margin: '0 5px',
                  boxShadow: currentPage === i + 1 ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 0px 1px 1px',
                }}
              >
                {i + 1}
              </button>
            ))}
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages))}
              disabled={currentPage === pages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AspirantTecnology;