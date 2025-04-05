import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, useLocation, NavLink, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import Heading from '../Heading';
import Button from '../Button';

const Wrapper = styled.section`
  .container {
    width: 95%;
    min-height: 78vh;
    margin: 2% auto;
  }

  .breadCrumb {
    font-size: 16px;
    display: flex;
    align-items: center;

    svg {
        font-size: 30px;
        color: #252E4A99;
    }
    a{
        text-decoration: none;
        color: #252E4A99;
    }
  }

  .title {
    width: 100%;
    margin: 2% auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    .heading {
      width: 250px;

      h1 {
        font-size: 20px !important;
      }
    }

  }

  .stage-cont {
    width: 100%;
    margin: 25px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

    .stage {
        width: 25%;
        min-width: 220px;
        max-width: 240px;
        height: auto;
        padding: 12px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);
    }

    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
    }

    p {
        margin: 10px 0;
    }

    .btn-cont {
        padding: 7px 15px 12px;
        display: flex;
        justify-content: center;
        gap: 15px;
        background: #3282c4;
        align-items: center;
        border-radius: 5px;

        img {
            height: 25px;
        }
    }

    span {
      margin-right: 10px;

      button {
        background: none;
        border: none;
        color: #fff;
      }

      svg {
        stroke: white;
        color: #fff;
        font-size: 24px;
        vertical-align: middle;
    }
    }
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    top: -25px;
    left: 0;
    width: 100%;
    height: 110%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    width: 90%;
    max-width: 700px;
    height: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-cont {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .input-group { 
    width: 49%;
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;

    label {
        color: #252E4A99;
    }

    input {
          &:focus {
            outline: none;
            border: 1px solid #2f87ff;
            background-color: #2f87ff10;
        }
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
  }

  .btn-group {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
        border-radius: 5px;
    }

    .btn-2 {
        background: none;
        border: 2px solid #3282c4;
        color: #3282c4;
    }
  }

  .modal input,
  .modal button {
    padding: 8px 10px;
    margin: 5px 0;
    border: 1px solid #DEDEDE;
    border-radius: 5px;
  }

  .modal button {
    background: #3282c4;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  /* Confirmation Modal */
  .confirmation-modal {
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .confirmation-content {
    width: 90%;
    max-width: 400px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;

    .del-icon {
        width: 70px;
        height: 70px;
        background: #ff6b63;
        border-radius: 50%;
        padding: 17px;
        margin: 20px auto;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    h3 {
        margin: 10px auto;
        font-size: 20px;
        font-weight: 600;
    }

    p {
        margin-top: -5px;
        font-size: 14px;
        font-weight: 400;
        color: #282828;
    }
  }

  .confirmation-content button {
    width: 43%;
    color: #fff;
    background: #3282c4;
    border-radius: 5px;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border: 2px solid #3282c4;
  }

  .confirmation-content button.cancel {
    color: #3282c4;
    background: #00000000;
    border: 2px solid #3282c4;
  }


  @media (min-width: 1440px) {
    .breadCrumb {
        font-size: 20px !important;
    }
  }

  @media (max-width: 500px) {
    .breadCrumb {
        font-size: 14px !important;
    }

    .stage-cont {
        justify-content: center;
    }
  }
`;

// Image URLs
const IMAGES = {
  noImage: "https://admin.aspiraskillhub.aspirasys.com/images/no-image-found.jpg",
  deleteIcon: "https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png",
  eye: "https://admin.aspiraskillhub.aspirasys.com/images/eye.png",
  edit: "https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png",
  trash: "https://admin.aspiraskillhub.aspirasys.com/images/trash.png"
};

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #3498db;
  transition: width 0.3s ease;
`;

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const techStackName = location.state?.techStackName;
  const techStackId = location.state?.techStackId;

  const [state, setState] = useState({
    stages: [],
    modalVisible: false,
    editMode: false,
    name: '',
    img: null,
    currentStageId: null,
    showConfirm: false,
    deleteId: null,
    sortValue: "",
    isLoading: true,
    loadProgress: 0
  });

  // Fetch stages with extended loader
  const fetchStages = useCallback(async () => {
    const MIN_LOADING_TIME = 2000; // Minimum 2 seconds loading time
    const startTime = Date.now();
    let progressInterval;

    try {
      // Start progress simulation
      progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          loadProgress: Math.min(prev.loadProgress + 10, 90) // Stop at 90% until load completes
        }));
      }, 300);

      const response = await fetch(`http://localhost:3000/admin/technology_stages/${techStackId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stages: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          stages: Array.isArray(data) ? data : [],
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    } catch (error) {
      console.error("Error fetching stages:", error);
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    }
  }, [techStackId]);

  useEffect(() => {
    if (techStackId) {
      setState(prev => ({
        ...prev,
        isLoading: true,
        loadProgress: 0
      }));
      fetchStages();
    }
  }, [techStackId, fetchStages]);

  // Handle thumbnail upload
  const handleThumbnailChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setState(prev => ({ ...prev, img: response.data.filePath }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((e) => {
    setState(prev => ({ ...prev, sortValue: e.target.value }));
  }, []);

  // Add stage
  const addStage = useCallback(async () => {
    if (!state.name || !techStackId || !state.sortValue) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    const payload = {
      technology_id: techStackId,
      name: state.name,
      image: state.img || null,
      sort: state.sortValue,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/technology_stages/create",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setState(prev => ({
        ...prev,
        stages: [...prev.stages, { ...payload, id: response.data.id }],
        name: "",
        img: null,
        sortValue: "",
        modalVisible: false
      }));
    } catch (error) {
      console.error("Error adding stage:", error.response?.data || error);
    }
  }, [state.name, state.img, state.sortValue, techStackId]);

  // Edit stage setup
  const editStage = useCallback((id) => {
    const stageToEdit = state.stages.find(stage => stage.id === id);
    setState(prev => ({
      ...prev,
      name: stageToEdit.name || "",
      img: stageToEdit.image || "",
      sortValue: stageToEdit.sort || "",
      currentStageId: id,
      editMode: true,
      modalVisible: true
    }));
  }, [state.stages]);

  // Update stage
  const updateStage = useCallback(async () => {
    try {
      const payload = {
        technology_id: techStackId,
        name: state.name,
        sort: Number(state.sortValue),
        image: state.img || null,
      };

      const res = await fetch(`http://localhost:3000/admin/technology_stages/update/${state.currentStageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updatedStages = state.stages.map(stage =>
          stage.id === state.currentStageId ? { ...stage, ...payload } : stage
        );
        setState(prev => ({
          ...prev,
          stages: updatedStages,
          modalVisible: false,
          editMode: false,
          name: "",
          img: null,
          sortValue: ""
        }));
      }
    } catch (err) {
      console.error("Error updating stage:", err);
    }
  }, [state.stages, state.currentStageId, state.name, state.img, state.sortValue, techStackId]);

  // Reset form
  const resetForm = useCallback(() => {
    setState(prev => ({
      ...prev,
      name: "",
      img: null,
      sortValue: "",
      modalVisible: false,
      editMode: false,
      currentStageId: null
    }));
  }, []);

  // Delete handlers
  const handleDelete = useCallback((id) => {
    setState(prev => ({ ...prev, deleteId: id, showConfirm: true }));
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/admin/technology_stages/delete/${state.deleteId}`, { 
        method: "DELETE" 
      });

      if (res.ok) {
        const updatedStages = state.stages.filter(stage => stage.id !== state.deleteId);
        setState(prev => ({
          ...prev,
          stages: updatedStages,
          showConfirm: false
        }));
        localStorage.setItem('stages', JSON.stringify(updatedStages));
      }
    } catch (err) {
      console.error("Error deleting stage:", err);
    }
  }, [state.deleteId, state.stages]);

  const cancelDelete = useCallback(() => {
    setState(prev => ({ ...prev, showConfirm: false }));
  }, []);

  return (
    <>
      {state.isLoading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading Stage Details...</LoadingText>
          <ProgressBar>
            <Progress progress={state.loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}
      
      <Wrapper>
        <div className="breadCrumb">
          <Link to="/admin/my-learnings">My Learnings</Link> 
          <MdKeyboardArrowRight /> 
          <span onClick={() => window.history.back()}>
            {techStackName || "Unknown"}
          </span>
          <MdKeyboardArrowRight />
          <p>{id || "Unknown"}</p>
        </div>
        
        <div className="title">
          <Heading title={techStackName || "Unknown"} />
          <Button onClick={() => setState(prev => ({
            ...prev,
            modalVisible: true,
            editMode: false,
            currentStageId: null
          }))}>
            + Add Stage
          </Button>
        </div>
        
        <div className="stage-cont">
          {state.stages.map((stage) => (
            <div key={stage.id} className="stage">
              <div className="stage-content">
                <img src={stage.image || IMAGES.noImage} alt={stage.name} />
                <p>{stage.name}</p>
                <div className="btn-cont">
                  <span>
                    <NavLink
                      to={`/admin/my-learnings/detail/${id}/material`}
                      state={{ 
                        stageTitle: stage.name, 
                        stageId: stage.id, 
                        techId: stage.technology_id, 
                        techStackName 
                      }}
                    >
                      <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="vuesax/linear/eye">
                            <g id="eye">
                              <path id="Vector" d="M12.9833 9.99993C12.9833 11.6499 11.6499 12.9833 9.99993 12.9833C8.34993 12.9833 7.0166 11.6499 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C11.6499 7.0166 12.9833 8.34993 12.9833 9.99993Z" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path id="Vector_2" d="M9.99987 16.8919C12.9415 16.8919 15.6832 15.1586 17.5915 12.1586C18.3415 10.9836 18.3415 9.00855 17.5915 7.83355C15.6832 4.83355 12.9415 3.10022 9.99987 3.10022C7.0582 3.10022 4.31654 4.83355 2.4082 7.83355C1.6582 9.00855 1.6582 10.9836 2.4082 12.1586C4.31654 15.1586 7.0582 16.8919 9.99987 16.8919Z" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </NavLink>
                  </span>
                  <span>
                    <button onClick={() => editStage(stage.id)}>
                      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="vuesax/linear/edit-2">
                          <g id="edit-2">
                            <path id="Vector" d="M11.55 3.00002L4.70829 10.2417C4.44996 10.5167 4.19996 11.0584 4.14996 11.4334L3.84162 14.1334C3.73329 15.1084 4.43329 15.775 5.39996 15.6084L8.08329 15.15C8.45829 15.0834 8.98329 14.8084 9.24162 14.525L16.0833 7.28335C17.2666 6.03335 17.8 4.60835 15.9583 2.86668C14.125 1.14168 12.7333 1.75002 11.55 3.00002Z" stroke="white" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_2" d="M10.4082 4.20825C10.7665 6.50825 12.6332 8.26659 14.9499 8.49992" stroke="white" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_3" d="M3 18.3333H18" stroke="white" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </span>
                  <span>
                    <button onClick={() => handleDelete(stage.id)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="vuesax/linear/trash">
                          <g id="trash">
                            <path id="Vector" d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_2" d="M7.0835 4.14163L7.26683 3.04996C7.40016 2.25829 7.50016 1.66663 8.9085 1.66663H11.0918C12.5002 1.66663 12.6085 2.29163 12.7335 3.05829L12.9168 4.14163" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_3" d="M15.7082 7.6167L15.1665 16.0084C15.0748 17.3167 14.9998 18.3334 12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0084L4.2915 7.6167" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_4" d="M8.6084 13.75H11.3834" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path id="Vector_5" d="M7.9165 10.4166H12.0832" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Stage Modal */}
        {state.modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <Heading title={state.editMode ? 'Edit Stage' : 'Add New Stage'} />
              <div className="form-cont">
                <div className="input-group">
                  <label htmlFor="stageName">Stage Name</label>
                  <input
                    id="stageName"
                    type="text"
                    value={state.name}
                    onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="number"
                    value={state.sortValue}
                    onChange={handleSortChange}
                    placeholder="Enter Sort Order"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="thumbnail">Thumbnail</label>
                  <div className="upload-img">
                    <div className="upload-content edit-tech-old">
                      <div className="edit-photo">
                        <img
                          src={state.img || IMAGES.noImage}
                          alt="thumbnail preview"
                        />
                      </div>
                      <p className="font-16 fw_500">Upload image</p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleThumbnailChange}
                      className="input editImage"
                      id="editImage_0"
                    />
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button className="btn-2" onClick={resetForm}>
                  Cancel
                </button>
                <button onClick={state.editMode ? updateStage : addStage}>
                  {state.editMode ? 'Update Stage' : 'Add Stage'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {state.showConfirm && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <div className="del-icon">
                <img src={IMAGES.deleteIcon} alt="delete" />
              </div>
              <h3>Are you sure?</h3>
              <p>you want to delete {state.stages.find(stage => stage.id === state.deleteId)?.name}</p>
              <button className="cancel" onClick={cancelDelete}>
                No
              </button>
              <button onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Detail;
