import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Heading from "../Heading";
import Button from "../Button";

const Wrapper = styled.section`
  .container {
    width: 95%;
    margin: 2% auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 5px #00000020;
  }

  .header {
    width: 100%;
    margin: 0 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    h1 {
      width: 150px;
    }
  }

  .searchBox {
    width: 100%;
    margin: auto;
    text-align: end;

    input {
      max-width: 170px;
      height: 40px;
      padding: 0 10px;
      font-size: 16px;
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
    width: 100%;
    min-width: 900px;
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd {
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.4fr 0.6fr 1.2fr 1.2fr 1.2fr 0.8fr 0.8fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    font-size: 14px;

    td {
      color: #505050;
      padding: 10px;
      font-size: 14px;

      span {
        font-size: 10px;
      }

      #action-icons {
        width: auto;
        height: auto;
      }

      img {
        width: 35px;
        height: 35px;
        margin-top: 7px;
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
  }

  .odd2 {
    grid-template-columns: 1fr!important;
    place-items: center;
    td {
      font-size: 16px !important;
      font-weight: 400;
      color: #757f91;
      }
  }

  .stack-output {
    display: flex;
    align-items: center;

    p {
      padding-left: 10px;
    }

    button {
      margin-right: 12px;
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
    color: #252E4A;
    margin: 20px 0 15px;
    padding: 0 30px;
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    svg {
      margin-bottom: -6px;
      font-size: 30px;
      color: #252E4A99;
    }

    a {
      text-decoration: none;
      color: #252E4A99;
    }

    span {
      color: #252E4A;
      cursor: pointer;
    }
  }

  .modal {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    max-width: 400px;
    width: 90%;
    height: auto;
    background: #fff;
    padding: 14px 24px;
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center  !important;

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
        font-size: 20px !important;
        margin-bottom: -5px;
        font-weight: 600;
      }
        span {
          font-size: 14px !important;
          font-weight: 400;
          color: #282828;

        }

        .btn-group {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 20px;
          padding: 0;

          button {
            width: 100%;
            padding: 7px 10px;
        }
      }
    }
  }

    /* MaterialDetail.css */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .video-modal {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    background: white !important;
    padding: 20px !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    z-index: 1001 !important;
    width: 500px !important;
    max-width: 90% !important;
    height: 400px !important;
    text-align: center !important;
    flex-direction: column !important;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .modal-header button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: #777;
    font-size: 1rem;
    cursor: pointer;
  }

  .modal-header h3 {
    margin: 0;
  }

  iframe {
    width: 450px;
    max-width: 100%;
    height: 300px;
    border: none;
    border-radius: 8px;
  }

    .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media (min-width: 1440px) { 
    .odd {
      font-size: 16px;

      td {
        font-size: 16px;
      }
    }

    .breadcrumb {
      font-size: 20px !important;
    }
  }

  @media (max-width: 650px) {
    .breadcrumb {
      padding: 0 15px !important;
      font-size: 16px !important;
    }
  }
  @media (max-width: 500px) {
    .breadcrumb {
      column-gap: 0;
      row-gap: 5px !important;
      font-size: 14px !important;
    }
  }

`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 5px;
  width: 90%;
  max-width: 800px;
  text-align: center;
  position: relative;

  .heading {
    width: 100%;
    text-align: start;
    margin-bottom: 25px;
    border-bottom: 1px solid #252e4a40;

    h1 {
      padding: 10px 0;
    }
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    height: 25px;
    background: url(data:image/png;base64,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)
      no-repeat;
    background-size: contain;
    background-position: center;
    border: none;
    opacity: 50%;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 410px;
  overflow: auto;

  .flex-sec {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .modal-section {
    text-align: left;
    width: 45%;
    min-width: 230px;
    padding: 15px;
    flex-grow: 1;
  }

  .form-group {
    padding: 10px 0;
    margin-bottom: 10px;
    position: relative;

    .paste {
      width: 20px;
      height: 20px;
      right: 18px;
      position: absolute;
      top: 44px;
      cursor: pointer;
    }

    .upload-img {
      position: relative;
      width: 240px;
      border-radius: 5px;

      .updated-addImage,
      .updated-addImageMaterial {
        width: 91%;
        height: 85%;
        object-fit: contain;
        position: absolute;
        background: white;
        margin: 10px;
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

  .type-cont {
    display: flex;

    .type {
      padding: 10px 0;
      margin-right: 10px;
      label {
        color: #252e4a99;
      }
      input {
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 500px) {
    .breadCrumb {
      font-size: 14px !important;
    }
  }
`;

const Label = styled.label`
  text-align: left;
  font-size: 14px;
  margin-bottom: 8px;
  color: #252e4a99;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #252e4a;
  font-size: 14px;

  &:focus {
    outline: none;
    border: 1px solid #2f87ff;
    background-color: #2f87ff10;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #252e4a;
  font-size: 14px;

  &:focus {
    outline: none;
    border: 1px solid #2f87ff;
    background-color: #2f87ff10;
  }

  option {
    color: #252e4a;
    background: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      // background-color: #0078d7;
    }
  }
`;

const ButtonGroup = styled.div`
width: 95%;
display: flex;
justify-content: flex-end;
gap: 15px;
background: #fff;
position: absolute;
left: 0px;
bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #2f87ff;
  color: white;

  &.btn-2 {
    background: Transparent;
    color: #2f87ff;
    border: 1px solid #2f87ff;
  }
`;

const SaveButton = styled(ModalButton)`
  background-color: #0078d7;
  color: white;
`;

const CancelButton = styled(ModalButton)`
  background-color: #f0f0f000;
  border: 1px solid #0078d7;
  color: #0078d7;
`;

// Image URLs
const IMAGES = {
  eye: "https://admin.aspiraskillhub.aspirasys.com/images/eye.png",
  edit: "https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png",
  trash: "https://admin.aspiraskillhub.aspirasys.com/images/trash.png",
  deleteIcon: "https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png"
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

const Material = () => {
  const [state, setState] = useState({
    materials: [],
    modalOpen: false,
    deleteModalOpen: false,
    materialToDelete: null,
    currentMaterial: null,
    currentPage: 1,
    isVideoModalOpen: false,
    videoUrl: "",
    isLoading: true,
    loadProgress: 0
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { techId, stageId, stageTitle, techStackName } = location.state || {};
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  // Fetch materials with extended loader
  const fetchMaterials = useCallback(async () => {
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

      const response = await axios.get(
        `https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${techId}/${stageTitle}`
      );

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          materials: response.data || [],
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    } catch (error) {
      console.error("Error fetching materials:", error);
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
  }, [techId, stageTitle]);

  useEffect(() => {
    if (techId && stageTitle) {
      setState(prev => ({
        ...prev,
        isLoading: true,
        loadProgress: 0
      }));
      fetchMaterials();
    }
  }, [techId, stageTitle, fetchMaterials]);

  // Event handlers
  const handleEditMaterial = useCallback((material) => {
    setState(prev => ({
      ...prev,
      currentMaterial: material,
      modalOpen: true
    }));
  }, []);

  const handleDeleteMaterial = useCallback(async () => {
    try {
      await axios.delete(
        `https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${techId}/${stageTitle}/delete/${state.materialToDelete.id}`
      );
      setState(prev => ({
        ...prev,
        materials: prev.materials.filter(mat => mat.id !== prev.materialToDelete.id),
        deleteModalOpen: false
      }));
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  }, [techId, stageTitle, state.materialToDelete]);

  const openDeleteModal = useCallback((material) => {
    setState(prev => ({
      ...prev,
      materialToDelete: material,
      deleteModalOpen: true
    }));
  }, []);

  const openVideoModal = useCallback((url) => {
    setState(prev => ({
      ...prev,
      videoUrl: url,
      isVideoModalOpen: true
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      modalOpen: false,
      deleteModalOpen: false,
      isVideoModalOpen: false,
      currentMaterial: null
    }));
  }, []);

  // Breadcrumb render
  const renderBreadcrumb = useCallback(() => {
    return (
      <div className="breadcrumb">
        <Link to="/admin/technologies">My Learnings</Link>
        <span> <MdKeyboardArrowRight /> </span>
        <Link onClick={() => navigate(-1)}>
          {techStackName || "Tech Stack"}
        </Link>
        <span> <MdKeyboardArrowRight /> </span>
        <span>{stageTitle || "Stage"}</span>
      </div>
    );
  }, [navigate, techStackName, stageTitle]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    setState(prev => {
      const sortedMaterials = [...prev.materials].sort((a, b) => {
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      return { ...prev, materials: sortedMaterials };
    });
  };

  return (
    <>
      {state.isLoading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading Materials...</LoadingText>
          <ProgressBar>
            <Progress progress={state.loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}

      <Wrapper>
        {/* Add or Edit Material Modal */}
        {state.modalOpen && (
          <ModalForm
            stageTitle={stageTitle}
            stageId={stageId}
            techId={techId}
            material={state.currentMaterial}
            setMaterial={(newMaterials) => setState(prev => ({
              ...prev,
              materials: newMaterials
            }))}
            onClose={closeModal}
          />
        )}

        {/* Delete Confirmation Modal */}
        {state.deleteModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="del-icon">
                <img src={IMAGES.deleteIcon} alt="delete" />
              </div>
              <p>Are you sure?</p>
              <span>To delete {state.materialToDelete?.name}</span>
              <div className="btn-group">
                <ModalButton className="btn-2" onClick={closeModal}>
                  No
                </ModalButton>
                <ModalButton onClick={handleDeleteMaterial}>
                  Yes, delete
                </ModalButton>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {state.isVideoModalOpen && (
          <>
            <div className="overlay" onClick={closeModal}></div>
            <div className="modal video-modal">
              <div className="modal-header">
                <h3>Video Preview</h3>
                <button onClick={closeModal}>✖</button>
              </div>
              <div className="modal-body">
                <iframe
                  src={state.videoUrl}
                  title="Video Player"
                  width="100%"
                  height="400px"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </>
        )}

        {renderBreadcrumb()}
        <div className="container">
          <div className="header">
            <Heading title={stageTitle || "Materials"} />
            <Button
              className="addBtn"
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  currentMaterial: null,
                  modalOpen: true
                }));
              }}
            >
              + Add Material
            </Button>
          </div>
          <div className="tab">
            <table className="tab-cols">
              <thead>
                <tr className="odd odd1">
                  <td>#</td>
                  <td onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>
                    Type <span>{sortConfig.key === "type" && (sortConfig.direction === "ascending" ? "▲" : "▼")}</span>
                  </td>
                  <td onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                    Technology Name <span>{sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "▲" : "▼")}</span>
                  </td>
                  <td onClick={() => handleSort("referal_link_1")} style={{ cursor: "pointer" }}>
                    Video Link <span>{sortConfig.key === "referal_link_1" && (sortConfig.direction === "ascending" ? "▲" : "▼")}</span>
                  </td>
                  <td onClick={() => handleSort("referal_link_2")} style={{ cursor: "pointer" }}>
                    Learning Link <span> {sortConfig.key === "referal_link_2" && (sortConfig.direction === "ascending" ? "▲" : "▼")} </span>
                  </td>
                  <td>Thumbnail</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {state.materials.length > 0 ? (
                  state.materials.map((material, index) => (
                    <tr className="odd" key={material.id}>
                      <td>{(state.currentPage - 1) * 10 + index + 1}</td>
                      <td>{material.type === "1" ? "Material" : "Project" || "-"}</td>
                      <td className="cut-text">{material.name}</td>
                      <td className="cut-text">{material.referal_link_1 || "-"}</td>
                      <td className="cut-text">{material.referal_link_2 || "-"}</td>
                      <td>
                        {material.image ? (
                          <img
                            src={material.image}
                            alt={material.name}
                            width="50"
                            height="50"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="stack-output">
                        <button onClick={() => openVideoModal(material.referal_link_1)}>
                          <img
                            id="action-icons"
                            src={IMAGES.eye}
                            alt="View"
                          />
                        </button>
                        <button onClick={() => handleEditMaterial(material)}>
                          <img
                            id="action-icons"
                            src={IMAGES.edit}
                            alt="Edit"
                          />
                        </button>
                        <button onClick={() => openDeleteModal(material)}>
                          <img
                            id="action-icons"
                            src={IMAGES.trash}
                            alt="Delete"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className='odd odd2'>
                    <td colSpan="7">No data available in the table.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const ModalForm = ({ material, setMaterial, stageId, stageTitle, techId, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    videoLink: "",
    learningLink: "",
    thumbnail: "",
    language: "",
    concept: "",
  });

  const [conceptOptions, setConceptOptions] = useState([]);

  useEffect(() => {
    
    axios
      .get(`https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${techId}/${stageTitle}`)
      .then((res) => {
        setConceptOptions(res.data); // adjust based on actual API shape
      })
      .catch((err) => {
        console.error("Error fetching concepts", err);
      });
    
  }, []);


  useEffect(() => {
    const languageMap = {
      1: "Hindi",
      2: "English",
      3: "Tamil",
    };

    const typeMap = {
      1: "Material",
      2: "Project"
    }

    if (material) {
      setFormData({
        type: typeMap[material.type] || "",
        name: material.name || "",
        videoLink: material.referal_link_1 || "",
        learningLink: material.referal_link_2 || "",
        thumbnail: material.image || "",
        language: languageMap[material.language_id] || "",
        concept: material.description || "",
      });
    } else {
      setFormData({
        type: "",
        name: "",
        videoLink: "",
        learningLink: "",
        thumbnail: "",
        language: "",
        concept: "",
      });
    }
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: URL.createObjectURL(file),
      }));
    }
  };

  // **CRUD Operations**

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("stageTitle:", stageTitle);
  //   console.log("techId:", techId);
  //   console.log("formData:", formData);

  //   if (!formData.name || !stageId || !techId) {
  //     alert("Missing required fields!");
  //     return;
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const languageIdMap = {
      Hindi: 1,
      English: 2,
      Tamil: 3,
    };

    const typeIdMap = {
      Material: 1,
      Project: 2
    }

    if (!formData.name || !stageId || !techId) {
      alert("Missing required fields!");
      return;
    }

    const isUpdating = !!material;
    const method = isUpdating ? "PUT" : "POST";
    const url = isUpdating
      ? `https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${stageTitle}/${techId}/update/${material.id}`
      : `https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${stageTitle}/${techId}/create`;

    const payload = {
      type: typeIdMap[formData.type] || "",
      name: formData.name,
      referal_link_1: formData.videoLink,
      referal_link_2: formData.learningLink,
      image: formData.thumbnail,
      language_id: languageIdMap[formData.language] || "",
      description: formData.concept,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const text = await response.text();
      console.log("Response Body:", text);

      if (response.ok) {
        const data = JSON.parse(text); // Parse manually
        console.log("Payload Data:", payload);
        console.log(material ? "Updated successfully!" : "Created successfully!");

        // Fetch updated materials list
        const updatedMaterials = await fetch(`
          https://api.aspiraskillhub.aspirasys.com/admin/technology_stages/${techId}/${stageTitle}`
        ).then(res => res.json());

        console.log("Updated Materials:", updatedMaterials);

        setMaterial(updatedMaterials); // Ensure setMaterial exists

        onSave?.(data);
        onClose?.();
      } else {
        console.error("Server Error:", text);
        alert(`Error: ${text}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      alert(`An unexpected error occurred: ${error.message}`);
    }

  };

  return (
    <ModalWrapper>
      <ModalContent>
        <button onClick={onClose} className="close-btn"></button>
        <Heading title={material ? "Edit" : "Add"} />
        <Form onSubmit={handleSubmit}>
          <div className="flex-sec">
            <div className="modal-section">
              <div className="form-group">
                <Label htmlFor="type">Type</Label>
                <div className="type-cont">
                  <div className="type">
                    <input
                      type="radio"
                      name="type"
                      value="Material"
                      checked={formData.type === "Material"}
                      onChange={handleRadioChange}
                      id="material"
                    />
                    <label htmlFor="material">Material</label>
                  </div>
                  <div className="type">
                    <input
                      type="radio"
                      name="type"
                      value="Project"
                      checked={formData.type === "Project"}
                      onChange={handleRadioChange}
                      id="project"
                    />
                    <label htmlFor="project">Project</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="videoLink">Video Link</Label>
                <Input
                  type="url"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <div className="upload-img">
                  <img
                    src={
                      formData.thumbnail ||
                      "https://admin.aspiraskillhub.aspirasys.com/images/no-image-found.jpg"
                    }
                    alt=""
                    className="edit-updated-image"
                  />
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    className="input"
                    id="editImage_0"
                  />
                </div>
              </div>
            </div>

            <div className="modal-section">
              <div className="form-group">
                <Label htmlFor="name">Topic Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <Label htmlFor="learningLink">Learning Link</Label>
                <Input
                  type="url"
                  name="learningLink"
                  value={formData.learningLink}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <Label htmlFor="language">Select Language</Label>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                </Select>
              </div>

              <div className="form-group">
                <Label htmlFor="concept">Where to place this</Label>
                <Select
                  name="concept"
                  value={formData.name}
                  onChange={handleChange}
                >
                  {/* <option value="">Select After</option> */}
                  {conceptOptions.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>

            </div>
          </div>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalWrapper>
  );
};


export default Material;
