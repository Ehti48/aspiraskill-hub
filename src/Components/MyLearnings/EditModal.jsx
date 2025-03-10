import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
  border-radius: 8px;
  width: 90%;
  max-width: 830px;
  height: 550px;
  padding: 25px 30px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

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
  overflow-y: auto;

  .input-cont {
    width: 50%;
    flex: 1;
  }

  .input-group {
    width: 100% !important;
    margin-bottom: 25px;
  }

  .checkbox-group {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .upload-img {
    position: relative;
    width: 240px;
    border-radius: 5px;

    .updated-addImage,
    .updated-addImageMaterial {
      max-width: 100%;
      height: 91%;
      object-fit: cover;
      object-position: center;
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
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
    color: #767a7a;
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
    color: #767a7a;
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

const EditModal = ({ isOpen, onClose, techStack = {}, onSave, existingIds, fetchTechStacks }) => {
  const [formValues, setFormValues] = useState({
    techId: "",
    name: "",
    stages: "",
    description: "",
    thumbnail: "",
    languages: [],
    other_technology: "0", // Ensuring it is never null
  });

  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (techStack && Object.keys(techStack).length > 0) {
      setFormValues({
        id: techStack.id || "",
        techId: techStack.technolgy_id || "ASPT_Dummy", // Ensure it is always assigned
        name: techStack.name || "",
        stages: techStack.no_stages || "",
        description: techStack.description || "",
        thumbnail: techStack.image || "",
        languages: Array.isArray(techStack.languages) ? techStack.languages : [],
        other_technology: techStack.other_technology || "0",
      });
      setImageSelected(!!techStack.image);
    } else {
      setFormValues({
        id: "",
        techId: "", // Ensure a default techId for new entries
        name: "",
        stages: "",
        description: "",
        thumbnail: "",
        languages: [],
        other_technology: "0",
      });
      setError("");
    }
  }, [techStack]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormValues((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      languages: checked
        ? [...new Set([...prevValues.languages, value])] // Ensuring no duplicates
        : prevValues.languages.filter((lang) => lang !== value),
    }));
  };

  const languageMap = {
    English: 1,
    Hindi: 2,
    Tamil: 3,
  };

  const handleSave = async () => {
    if (!formValues.techId) {
      setError("Tech ID is required");
      return;
    }

    const languagesString = formValues.languages.length > 0
      ? formValues.languages.map((lang) => languageMap[lang]).join(",")
      : "1"; // Default to 1

    const updatedFields = {
      id: formValues.id,
      technolgy_id: formValues.techId,
      name: formValues.name,
      no_stages: formValues.stages,
      description: formValues.description,
      image: formValues.thumbnail || "",
      languages: languagesString,
      other_technology: formValues.other_technology || "0",
    };

    try {
      setLoading(true);
      await onSave(updatedFields);
      onClose();
      console.log("Updated Data:", updatedFields);  
    } catch (error) {
      console.error("Error saving tech stack:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <ModalWrapper>
        <ModalContent>
          <div className="header">
            <Title>{techStack ? "Edit Tech Stack" : "Add Tech Stack"}</Title>
            <div className="close-icon" onClick={onClose}>✖</div>
          </div>

          <Form>
            <div className="input-cont">
              <div className="input-group">
                <label>Technology ID</label>
                <input
                  type="text"
                  name="techId"
                  value={formValues.techId}
                  onChange={handleChange}
                  disabled={!!techStack?.id}  // Only disable if editing an existing tech stack
                />

                {error && <ErrorMessage>{error}</ErrorMessage>}
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea name="description" value={formValues.description} onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Thumbnail</label>
                <div className="upload-img">
                  <img
                    src={formValues.thumbnail || "https://admin.aspiraskillhub.aspirasys.com/images/no-image-found.jpg"}
                    alt="Thumbnail"
                    className="edit-updated-image"
                  />
                  <input type="file" name="image" className="d-none editImage" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            <div className="input-cont">
              <div className="input-group">
                <label>Technology Name</label>
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Number of Stages</label>
                <input type="number" name="stages" value={formValues.stages} onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Select Languages:</label>
                <div className="checkbox-group">
                  <label htmlFor="english">
                    English
                    <input
                      type="checkbox"
                      value="English"
                      id="english"
                      checked={formValues.languages?.includes("English")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label htmlFor="hindi">
                    Hindi
                    <input
                      type="checkbox"
                      value="Hindi"
                      id="hindi"
                      checked={formValues.languages?.includes("Hindi")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <label htmlFor="Tamil">
                    Tamil
                    <input
                      type="checkbox"
                      value="Tamil"
                      id="Tamil"
                      checked={formValues.languages?.includes("Tamil")}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </Form>

          <ButtonGroup>
            <button className="cancel-btn" onClick={onClose}>Close</button>
            <button className="save-btn" onClick={() => { setLoading(true); handleSave(); }} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </ButtonGroup>
        </ModalContent>
      </ModalWrapper>
    )
  );
};

export default EditModal;