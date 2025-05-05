import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../../Heading";
import { NavLink } from "react-router-dom";
import Button from "../../Button";
import axios from "axios";
import ProgressLoader from "../../ProgressLoader";
import { useMemo } from "react";

const Wrapper = styled.section`

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
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
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

  .tab {
    overflow-x: auto;
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
    min-width: 900px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr 1.5fr 1.5fr 1fr 0.6fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    

    td {
      padding: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #252E4A;
    }
  }

  .odd1 {
    position: relative;
    top: 4px;
    color: #252E4A99;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;

    td {
      font-weight: 500;
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

  .header {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  .searchBox {
    width: 17%;
    text-align: end;

    input {
      width: 120px;
      height: 40px;
      padding: 0 10px;
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

    td {
      color: #252E4A99;
      padding: 10px;
    }
  }

  .odd1 {
    position: relative;
    top: 4px;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;

    td {
      color: #252E4A99 !important;
    }
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

.pagination-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.page-button {
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  margin: 0 4px;
  transition: all 0.3s ease;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.page-button:hover {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}
.page-button.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.pagination-ellipsis {
  margin: 0 8px;
  font-size: 20px;
}

  @media only screen and (max-width: 450px) {
    .header {
      margin: 10px auto !important;
      align-items: start !important;
      flex-direction: column;
    }

        .pagination-controls {
      gap: 5px;

    button {
      padding: 5px 12px;
      font-size: 12px;
    }
    }
  }

    @media screen and (max-width: 375px) {
    .pagination-controls {
      button {
        padding: 5px 10px;
        font-size: 10px;
      }
    }
  }
`;

const TrainingPlan = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTimesheets = async () => {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      try {
        const response = await axios.get(
          "https://api.aspiraskillhub.aspirasys.com/api/admin/aspirants-progress"
        );
        console.log("API Response:", response.data);
        const data = response.data || [];

        // Format training_plan_status
        const formattedData = data.map((student) => ({
          ...student,
          training_plan_status:
            student.training_plan_status.replace(".00", "") + "%",
        }));

        setStudents(formattedData);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      } finally {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setIsLoading(false), 300); // Small delay for smooth transition
      }
    };

    fetchTimesheets();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter(
    (student) =>
      (typeof student?.full_name === "string" &&
        student.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof student?.technology === "string" &&
        student.technology.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof student?.aspirant_id === "string" &&
        student.aspirant_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const { pages, paginatedStudents } = useMemo(() => {
    const pages = Math.ceil(filteredStudents.length / 10);
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    const paginatedStudents = filteredStudents.slice(start, end);

    return { pages, paginatedStudents };
  }, [filteredStudents, currentPage]);

  const renderPagination = () => {
    if (pages <= 1) return null;

    const visiblePages = [];
    const maxVisible = 5;

    if (pages <= maxVisible) {
      for (let i = 1; i <= pages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, '...', pages);
      } else if (currentPage >= pages - 2) {
        visiblePages.push(1, '...', pages - 3, pages - 2, pages - 1, pages);
      } else {
        visiblePages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pages);
      }
    }

    return (
      <div className="pagination-controls">
        {currentPage > 1 && (
          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
        )}

        {visiblePages.map((page, index) => {
          if (page === '...') {
            return <span key={index} className="pagination-ellipsis">...</span>;
          }
          return (
            <button
              key={index}
              className={`page-button ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}

        {currentPage < pages && (
          <button
            className="page-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <Wrapper>
      {isLoading && <ProgressLoader progress={progress} />}

      <div className="dateSec">
        <Heading title="Training Plan" />
        <div className="list-cont">
          <div className="container-2">
            <div className="header">
              <div className="searchBox">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="exportBtn">Export XLS</Button>
            </div>
            <div className="tab">
              <table className="tab-cols">
                <thead>
                  <tr className="odd odd1">
                    <td>#</td>
                    <td>Aspira ID</td>
                    <td>Technology Name</td>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.length > 0 ? (
                    paginatedStudents.map((student, index) => (
                      <tr className="odd" key={index}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td>{student.aspirant_id}</td>
                        <td>{student.technology}</td>
                        <td>{student.full_name}</td>
                        <td className="cut-text">
                          {student.training_plan_status}
                        </td>
                        <td className="stack-output">
                          <NavLink
                            to={`/admin/aspirants-progress/aspirants-technology/${student.user_id}`}
                            state={{
                              studentId: student.aspirant_id,
                              studentTech: student.technology,
                              techId: student.technology_id,
                              userId: student.user_id,
                              studentName: student.full_name,
                            }}
                          >
                            <button className="btn re-submit">
                              <span>
                                <img
                                  src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
                                  alt="Export"
                                />
                              </span>
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="odd odd2">
                      <td colSpan="7">
                        {isLoading
                          ? "Loading..."
                          : "No data available in the table."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {renderPagination()}
      </div>
    </Wrapper>
  );
};

export default TrainingPlan;