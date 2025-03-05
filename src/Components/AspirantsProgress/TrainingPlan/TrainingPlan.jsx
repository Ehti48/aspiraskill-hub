import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { NavLink } from 'react-router-dom';
import Button from '../../Button';
import axios from 'axios';

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
    min-width: 770px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.2fr 0.7fr 1.5fr 1.5fr 0.8fr 0.6fr !important;
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

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media only screen and (max-width: 450px) {
    .header {
      margin: 10px auto !important;
      align-items: start !important;
      flex-direction: column;
    }
  }
`;

const TrainingPlan = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get('http://localhost:48857/api/admin/aspirants-progress');
        console.log('API Response:', response.data);
        const data = response.data || [];
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchTimesheets();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Ensure undefined values don't cause issues
  const filteredStudents = students.filter((student) =>
    (typeof student?.full_name === 'string' && student.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof student?.technology === 'string' && student.technology.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof student?.aspirant_id === 'string' && student.aspirant_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pages = Math.ceil(filteredStudents.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedStudents = filteredStudents.slice(start, end); // Use filtered list

  return (
    <Wrapper>
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
                        <td>{start + index + 1}</td>
                        <td>{student.aspirant_id}</td>
                        <td>{student.technology}</td>
                        <td>{student.full_name}</td>
                        <td className="cut-text">{student.last_status}</td>
                        <td className="stack-output">
                          <NavLink
                            to="/admin/aspirants-progress/aspirant-tech"
                            state={{ studentId: student.aspirant_id, studentTech: student.technology, studentAspirantId: student.aspirant_id, studentName: student.full_name }}
                          >
                            <button className="btn re-submit">
                              <span>
                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png" alt="Export" />
                              </span>
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="odd odd2">
                      <td colSpan="7">No data available in the table.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {paginatedStudents.length > 10 && (
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
      </div>
    </Wrapper>
  );
};

export default TrainingPlan;

