import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../Heading';
import { Link, useLocation, useParams, NavLink } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import Button from '../Button';

const Wrapper = styled.section`
  .container {
    width: 95%;
    min-height: 78vh;
    margin: 2% auto;
  }

  .breadCrumb {
    font-size: 18px;
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


  @media (min-width: 1350px) {
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

const Detail = () => {
    const { id } = useParams();
    const [stages, setStages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [currentStageId, setCurrentStageId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const location = useLocation();
    const techStackName = location.state?.techStackName;

    useEffect(() => {
        const storedStages = JSON.parse(localStorage.getItem('stages')) || [];
        setStages(storedStages);
    }, []);

    const addStage = () => {
        const duplicateStage = stages.find((stage) => stage.title === name);

        if (duplicateStage) {
            alert('A stage with this title already exists');
            return;
        }

        const newStage = {
            id: Date.now(),
            title: name,
            img: img,
        };

        const updatedStages = [...stages, newStage];
        setStages(updatedStages);
        localStorage.setItem('stages', JSON.stringify(updatedStages));
        setModalVisible(false);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                localStorage.setItem("thumbnail", base64Image); // Save to local storage
                setImg(base64Image); // Update state
            };
            reader.readAsDataURL(file);
        }
    };

    const editStage = (id) => {
        const stageToEdit = stages.find((stage) => stage.id === id);
        setName(stageToEdit.title || '');
        setImg(stageToEdit.img || '');
        setCurrentStageId(id);
        setEditMode(true);
        setModalVisible(true);
    };


    const updateStage = () => {
        const updatedStages = stages.map((stage) =>
            stage.id === currentStageId
                ? { ...stage, title: name, img: img }
                : stage
        );

        setStages(updatedStages);
        localStorage.setItem('stages', JSON.stringify(updatedStages));

        setModalVisible(false);
        setEditMode(false);
        setName('');
        setImg('');
    };

    const resetForm = () => {
        setName("");
        setImg("");
        setModalVisible(false);
        setEditMode(false);
        setCurrentStageId(null);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        const updatedStages = stages.filter((stage) => stage.id !== deleteId);
        setStages(updatedStages);
        localStorage.setItem('stages', JSON.stringify(updatedStages));
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <Wrapper>
            <div className="container">
                <div className="breadCrumb">
                    <Link to="/admin/my-learnings">Tech Stack</Link> <MdKeyboardArrowRight /> <span> {techStackName} </span>
                </div>
                <div className="title">
                    <Heading title={techStackName} />
                    <Button onClick={() => setModalVisible(true)}>+ Add Stage</Button>
                </div>
                <div className="stage-cont">
                    {stages.map((stage) => (
                        <div key={stage.id} className="stage">
                            <div className="stage-content">
                                <img src={stage.img} alt="" />
                                <p>{stage.title}</p>
                                <div className="btn-cont">
                                    <span>
                                        <NavLink
                                            to={`/admin/my-learnings/detail/${id}/material`}
                                            state={{ stageTitle: stage.title, stageId: stage.id, techStackName }}

                                        >

                                            <button>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="vuesax/linear/eye">
                                                        <g id="eye">
                                                            <path id="Vector" d="M12.9833 9.99993C12.9833 11.6499 11.6499 12.9833 9.99993 12.9833C8.34993 12.9833 7.0166 11.6499 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C11.6499 7.0166 12.9833 8.34993 12.9833 9.99993Z" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path id="Vector_2" d="M9.99987 16.8919C12.9415 16.8919 15.6832 15.1586 17.5915 12.1586C18.3415 10.9836 18.3415 9.00855 17.5915 7.83355C15.6832 4.83355 12.9415 3.10022 9.99987 3.10022C7.0582 3.10022 4.31654 4.83355 2.4082 7.83355C1.6582 9.00855 1.6582 10.9836 2.4082 12.1586C4.31654 15.1586 7.0582 16.8919 9.99987 16.8919Z" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
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
                                                        <path id="Vector" d="M11.55 3.00002L4.70829 10.2417C4.44996 10.5167 4.19996 11.0584 4.14996 11.4334L3.84162 14.1334C3.73329 15.1084 4.43329 15.775 5.39996 15.6084L8.08329 15.15C8.45829 15.0834 8.98329 14.8084 9.24162 14.525L16.0833 7.28335C17.2666 6.03335 17.8 4.60835 15.9583 2.86668C14.125 1.14168 12.7333 1.75002 11.55 3.00002Z" stroke="white" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_2" d="M10.4082 4.20825C10.7665 6.50825 12.6332 8.26659 14.9499 8.49992" stroke="white" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_3" d="M3 18.3333H18" stroke="white" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
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
                                                        <path id="Vector" d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_2" d="M7.0835 4.14163L7.26683 3.04996C7.40016 2.25829 7.50016 1.66663 8.9085 1.66663H11.0918C12.5002 1.66663 12.6085 2.29163 12.7335 3.05829L12.9168 4.14163" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_3" d="M15.7082 7.6167L15.1665 16.0084C15.0748 17.3167 14.9998 18.3334 12.6748 18.3334H7.32484C4.99984 18.3334 4.92484 17.3167 4.83317 16.0084L4.2915 7.6167" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_4" d="M8.6084 13.75H11.3834" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        <path id="Vector_5" d="M7.9165 10.4166H12.0832" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
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

                {/* Modal for adding or editing a stage */}
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <Heading title={editMode ? 'Edit Stage' : 'Add New Stage'} />
                            <div className="form-cont">
                                {/* Stage Name Input */}
                                <div className="input-group">
                                    <label htmlFor="stageName">Stage Name</label>
                                    <input
                                        id="stageName"
                                        type="text"
                                        value={editMode ? name : null}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Thumbnail Upload */}
                                <div className="input-group">
                                    <label htmlFor="thumbnail">Thumbnail</label>
                                    <div className="upload-img">
                                        <div className="upload-content edit-tech-old">
                                            <div className="edit-photo">
                                                <img
                                                    src="https://admin.aspiraskillhub.aspirasys.com/images/no-image-found.jpg"
                                                    alt="placeholder"
                                                />
                                            </div>
                                            <p className="font-16 fw_500">Upload image</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            onChange={handleThumbnailChange} // Handle file upload
                                            className="input editImage"
                                            id="editImage_0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="btn-group">
                                <button
                                    className="btn-2"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editMode ? updateStage : addStage}
                                >
                                    {editMode ? 'Update Stage' : 'Add Stage'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Confirmation Modal for Deleting */}
                {showConfirm && (
                    <div className="confirmation-modal">
                        <div className="confirmation-content">
                            <div class="del-icon">
                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png" alt="delete" />
                            </div>
                            <h3>Are you sure?</h3>
                            <p>you want to delete {stages.find((stage) => stage.id === deleteId)?.title}</p>
                            <button className="cancel" onClick={cancelDelete}>
                                No
                            </button>
                            <button onClick={confirmDelete}>Yes, Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default Detail;
