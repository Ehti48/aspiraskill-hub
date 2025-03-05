import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Heading from "../../../Components/Heading";
import { MdKeyboardArrowRight } from "react-icons/md";
import Loader from "../../../Components/Loader";
import Button from "../../../Components/Button";

const Wrapper = styled.section`
  .dateSec {
    width: 95%;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 1px rgba(6, 40, 61, 0.06);
  }

  .user-timesheet {
    padding: 10px 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .breadcrumb {
    margin: 0;
    padding: 0 12px 0px;
    font-size: 16px;
    color: #000 !important;
  }

  .breadcrumb a {
    color: #0078d7;
    text-decoration: none;
  }
  .ad-sck {
    margin: 0px;
    margin-bottom: 10px;
    display: flex;
    list-style: none;
    align-items: center;

    li {
      font-size: 18px;
      font-weight: 500;
      color: #252e4a;
      a {
        color: #787e91;
        font-size: 18px;
        text-decoration: none;
        padding-right: 5px;
      }
    }
    svg {
      color: #252e4a99;
      font-size: 30px;
    }
  }
  .usertime-name {
    position: relative;
    color: #252e4a;
    font-size: 18px;
    font-weight: 600;

    &:before {
      position: absolute;
      content: "";
      width: 0px;
      height: 24px;
      border: 4px solid #6aaa43;
      left: -18px;
      top: -4px;
    }
  }

  .heading {
    height: 25px;
    margin: 0;
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
    gap: 1vw;

    &.btm-header {
      margin: 0;
      justify-content: flex-end;
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

  .odd {
    min-width: 770px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.4fr 1.5fr 2fr 1fr 1fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;

    td {
      padding: 10px;
      color: #252e4a;
      font-size: 14px;
      font-weight: 400;
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

  .container-2 {
    width: 100%;
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
    width: 95%;
    min-width: 900px;
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

    td {
      color: #252e4a99;
      padding: 10px;
    }
  }

  .odd2 {
    grid-template-columns: 1fr !important;
    place-items: center;

    td {
      font-size: 16px !important;
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

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 500px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.modal-header button:hover {
  color: #333;
}

.modal-body {
  margin-bottom: 20px;
  line-height: 3;
}

.modal-body p {
  margin: 10px 0;
  font-size: 14px;
  color: #252e4a;
  font-weight: 400;
}

.modal-body p:nth-child(1) {
  line-height: 1.7;
  font-size: 16px !important;
}

.modal-body strong {
  color: #252e4a99;
  font-weight: 400;
}

.modal-body a {
  color: #007bff;
  text-decoration: none;
}

.modal-body a:hover {
  text-decoration: underline;
}

.modal-body img {
  max-width: 100%;
  border-radius: 4px;
  margin-top: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-footer button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.3s ease;
}

.modal-footer .cancel-btn {
  background: #f0f0f0;
  color: #333;
}

.modal-footer .cancel-btn:hover {
  background: #ddd;
}

.modal-footer .add-btn {
  background: #3282c4;
  color: white;
}

.modal-footer .add-btn:hover {
  background: #2d6da0;
}

  .pagination {
    margin: 10px 0 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 400px) {
    .btm-header {
      margin-top: 10px !important;
      justify-content: flex-start !important;
    }
  }
`;

const MaterialDetail = () => {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const stageTitle = location.state?.stageTitle;
  const techName = location.state?.techName;
  const studentId = location.state?.studentId;
  const technologyId = location.state?.technologyId;
  const stageId = location.state?.stageId;

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:48857/api/admin/aspirant/1/trainingplan/1/${stageId}`
        );
        setMaterials(response.data.materials);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setLoading(false);
        console.log(stageId);
      }
    };

    fetchData();
  }, [studentId, technologyId, stageId]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Filter materials based on search query
  const filteredMaterials = materials.filter(
    (material) =>
      material.material_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      material.material_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDelete = async (materialId) => {
    try {
      await axios.delete(
        `http://localhost:48857/api/admin/aspirant/1/trainingplan/1/1/${materialId}}`
      );
      // Update the materials list after deletion
      setMaterials(
        materials.filter((material) => material.material_id !== materialId)
      );
    } catch (err) {
      console.error("Error deleting material:", err);
      alert("Failed to delete material. Please try again.");
      console.log(materialId);
    }
  };

  const pages = Math.ceil(filteredMaterials.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredMaterials.slice(start, end);


  return (
    <Wrapper>
      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to="/admin/aspirants-progress">Training Plan</Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item">
              <Link onClick={() => navigate(-2)}>{techName}</Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item">
              <Link onClick={() => navigate(-1)}>{stageTitle}</Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {studentId}
            </li>
          </ol>
        </nav>
      </div>
      <div className="dateSec">
        <div className="header">
          <Heading title="Training Plan" />
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
                    <td>Material Name</td>
                    <td>Type</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.length > 0 ? (
                    paginatedTechStacks.map((material, index) => (
                      <tr className="odd" key={material.material_id}>
                        <td className="num">{index + 1}</td>
                        <td className="cut-text">{material.material_name}</td>
                        <td>
                          {material.material_type === "1"
                            ? "Material"
                            : "Project"}
                        </td>
                        <td>
                          {material.status === "1"
                            ? "Completed"
                            : "In Progress"}
                        </td>
                        <td className="stack-output">
                          <button
                            onClick={() => {
                              setSelectedMaterial(material);
                              setIsViewModalOpen(true);
                            }}
                          >
                            <img
                              src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png"
                              alt="view"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="odd odd2">
                      <td colSpan="5">No data available in the table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
                  {filteredMaterials.length > 10 && (
                            <div className="pagination">
                            <Button
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              style={{ padding: '8px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#3282c4', color: 'white', cursor: 'pointer' }}
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
                                  backgroundColor: currentPage === i + 1 ? '#3282c4' : 'transparent', // Active color changed
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
                              style={{ padding: '8px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#3282c4', color: 'white', cursor: 'pointer' }}
                              disabled={currentPage === pages}
                            >
                              Next
                            </Button>
                          </div>
                  )}
        {isViewModalOpen && (
          <>
            <div
              className="overlay"
              onClick={() => setIsViewModalOpen(false)}
            >
            </div>
            <div className="modal view-modal">
              <div className="modal-header">
                <h3>Training Material</h3>
                <button onClick={() => setIsViewModalOpen(false)}>✖</button>
              </div>
              <div className="modal-body">
                {selectedMaterial && (
                  <>
                    <p>
                      <strong>Project Name:</strong>{" "}<br />
                      {selectedMaterial.material_name}
                    </p>
                    <p>
                      <strong>Project URL:</strong>{" "}
                      {/* {selectedMaterial.material_type === "1"
                      ? "Material"
                      : "Project"} */}
                    </p>
                    <p>
                      <strong>Repository URL:</strong>{" "}
                      {/* {selectedMaterial.status === "1"
                      ? "Completed"
                      : "In Progress"} */}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {/* <a
                      href={selectedMaterial.referal_link_1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedMaterial.referal_link_1}
                    </a> */}
                    </p>
                    {selectedMaterial.referal_link_2 && (
                      <p>
                        <strong>Referral Link 2:</strong>{" "}
                        <a
                          href={selectedMaterial.referal_link_2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedMaterial.referal_link_2}
                        </a>
                      </p>
                    )}
                    {selectedMaterial.project && (
                      <>
                        <p>
                          <strong>Project Title:</strong>{" "}
                          {selectedMaterial.project.title}
                        </p>
                        <p>
                          <strong>Project Duration:</strong>{" "}
                          {selectedMaterial.project.duration}
                        </p>
                        <p>
                          <strong>Project URL:</strong>{" "}
                          <a
                            href={selectedMaterial.project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedMaterial.project.url}
                          </a>
                        </p>
                        <p>
                          <strong>Repository URL:</strong>{" "}
                          <a
                            href={selectedMaterial.project.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedMaterial.project.repository}
                          </a>
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {selectedMaterial.project.description}
                        </p>
                        {selectedMaterial.project.image && (
                          <img
                            src={selectedMaterial.project.image}
                            alt="Project"
                            style={{ maxWidth: "100%" }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="cancel-btn"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="add-btn"
                  onClick={() => {
                    // Handle adding the material to the training plan
                    alert("Material added to the training plan!");
                    setIsViewModalOpen(false);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default MaterialDetail;
