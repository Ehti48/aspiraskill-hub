import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
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
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 830px;
  height: 550px;
  padding: 25px 30px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

   .header {
      h2 {
        margin-bottom: 0px !important;
      }

      .close-icon {
      position: absolute;
      top: 15px;
      right: 25px;
      font-size: 20px;
      font-weight: 500;
      color: #252e4a99;
      cursor: pointer;
      }
    }
`;

const Title = styled.h2`
  margin: 0 0 20px;
  color: #333;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    height: 80%;
    max-height: 80%;
    overflow: auto;

    .input-cont {
      width: 50%;
      flex: 1;
    }

    .input-group {
      width: 100% !important;
      margin-bottom: 25px;
    }

  .upload-img {
    position: relative;
    width: 240px;
    border-radius: 5px;

    .updated-addImage, .updated-addImageMaterial {
      width: 91%;
      height: 85%;
      margin: 10px;
      object-fit: contain;
      position: absolute;
      background-color: white !important;
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
      top: 0;
      height: 100%;
      opacity: 0;
    }
  }

  label {
    font-size: 14px;
    font-weight: 500;
    color: #767A7A;
  }

  input,
  textarea {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  input:focus,
  textarea:focus {
    border-color: #3986c6;
    background-color: #3986c610;
    outline: none;
  }

  textarea {
    resize: none;
    height: 100px;
  }

  .checkBox {
    font-size: 14px;
    font-weight: 500;
    color: #767A7A;
    display: flex;
    margin-top: 10px;
    gap: 25px;

    .check {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
    width: 20%;
    min-width: 100px;
  }

  .save-btn {
    background: #3282c4;
    color: white;

    &:hover {
      
    }
  }

  .cancel-btn {
    background: none;
    border: 2px solid #3282c4;
    color: #3282c4;

    &:hover {

    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const EditModal = ({ isOpen, onClose, techStack, onSave, existingIds }) => {
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    stages: '',
    description: '',
    timeStamp: Date.now(),
    thumbnail: techStack?.thumbnail || localStorage.getItem('thumbnail') || '', // Only persist if techStack is available
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (techStack) {
      setFormValues({
        id: techStack.id,
        name: techStack.name,
        stages: techStack.stages,
        description: techStack.description,
        thumbnail: techStack.thumbnail, // Use stored thumbnail if available
      });
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        thumbnail: '', // Reset to empty if it's the Add Modal
      }));
    }
  }, [techStack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (existingIds.includes(formValues.id) && techStack?.id !== formValues.id) {
      setError('Duplicate ID is not allowed.');
      return;
    }
    setError('');
    onSave(formValues);
  };

  const [imageSelected, setImageSelected] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSelected(true); // Set to true when an image is selected
      const reader = new FileReader();
      reader.onload = () => {
        // Update the form value to display the selected image
        setFormValues((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    isOpen && (
      <ModalWrapper>
        <ModalContent>
          <div className="header">
          <Title>{techStack ? 'Edit Tech Stack' : 'Add Tech Stack'}</Title>
          <div className="close-icon" onClick={onClose}>✖</div>
          </div>
          <Form>
            <div className="input-cont">
              <div className="input-group">
                <label>Technology ID</label>
                <input
                  type="text"
                  name="id"
                  value={formValues.id}
                  onChange={handleChange}
                  disabled={!!techStack} // Disable ID edit if it's an edit
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Thumbnail</label>
                <div className="upload-img">
                  <label htmlFor="editImage_0"></label>
                  <img
                    src={formValues.thumbnail || 'https://admin.aspiraskillhub.aspirasys.com/images/no-image-found.jpg'}
                    alt=""
                    className="edit-updated-image updated-addImage"
                    style={{
                      opacity: imageSelected ? 1 : 0, // Conditional opacity
                      transition: 'opacity 0.3s ease', // Smooth transition
                    }}
                  />
                  <div className="upload-content edit-tech-old">
                    <div className="edit-photo">
                      <img
                        src="https://admin.aspiraskillhub.aspirasys.com/images/profile-upload.png"
                        alt="profile"
                        style={{
                          opacity: 1, // Conditional opacity
                          transition: 'opacity 0.3s ease', // Smooth transition
                        }}
                      />
                    </div>
                    <p className="font-16 fw_500">Upload image</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    className="input d-none editImage"
                    id="editImage_0"
                    onChange={handleFileChange}
                    required=""
                  />
                </div>
              </div>
            </div>
            <div className="input-cont">
              <div className="input-group">
                <label>Technology Name</label>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Number of Stages (In numbers)</label>
                <input type="number" name="stages" value={formValues.stages} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Material Language</label>
                <div className="checkBox">
                  <div className="check">
                    English
                    <input type="checkbox" name="english" id="" />
                  </div>
                  <div className="check">
                    Tamil
                    <input type="checkbox" name="tamil" id="" />
                  </div>
                  <div className="check">
                    Hindi
                    <input type="checkbox" name="hindi" id="" />
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <ButtonGroup>
            <button className="cancel-btn" onClick={onClose}>
              Close
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </ButtonGroup>
        </ModalContent>
      </ModalWrapper>
    )
  );
};

export default EditModal;