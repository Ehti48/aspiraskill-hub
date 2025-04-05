import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Heading from '../../Heading';
import Button from '../../Button';

const Wrapper = styled.section`
  .dateSec {
    margin-bottom: 14px;
    padding: 16px 20px;
    background: rgba(222, 222, 222, 0.1);
    border: 1px solid #dedede;
    border-radius: 4px;
  }

  .date-header {
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    row-gap: 20px;
    align-items: flex-end;
  }

  .date-section {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 10px;
  }

  .date-form {
    display: flex;
    flex-direction: column;
    position: relative;

    label {
      margin-bottom: 12px;
      color: #767a7a;
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
    }

    input[type="date"],
    select {
      border-radius: 4px;
      background: rgba(222, 222, 222, 0.1);
      color: #333335;
      border: 1px solid #dedede;
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      padding: 10px 20px;
      outline: none;
    }

    input:focus,
    select:focus {
      background: #ebf3fa;
      border-color: #3282c4;
    }
  }

  .date-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 20px;
    background: white;
    pointer-events: none;
    bottom: 12px;
    display: flex;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .src-button {
    display: flex;
    gap: 10px;

    button {
      background-color: #3282c4;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        padding: 12px 20px;
      }
    }

    .reset-button {
      padding: 8px 15px;
      background: none;
      color: #3282c4;
      font-size: 15px;
      border: 1px solid #7db0d9;

      img {
        margin-right: 5px;
        padding: 0;
      }
    }
  }

  /////////////////////// Timesheet Listing //////////////////

  .heading {
    height: 25px;
  }

  .container-2 {
    width: 100%;
  }

  .header {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    button {
      padding: 8px 12px;
      font-weight: 500;
    }
  }

  .searchBox {
    width: 120px;
    text-align: end;

    input {
      width: 100%;
      height: auto;
      padding: 7px 10px;
      font-size: 14px;
      color: #282828;
      border: 1px solid #00000080;
      border-radius: 4px;
      outline: none;
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
    margin: 10px auto;
    overflow-x: scroll;
  }

  .odd {
    min-width: 950px;
    height: 40px;
    display: grid;
    padding-left: 15px;
    grid-template-columns: 0.3fr 0.7fr 1.5fr 1.5fr 1fr 1.5fr 1fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    font-size: 14px;

    td {
      color: #252e4a;
      padding: 10px;
      font-size: 14px;
      font-weight: 400;
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
        color: #252e4a99;
        font-weight: 500;
      }

  }

  .odd2 {
    grid-template-columns: 1fr !important;
    place-items: center;

    td {
      font-size: 16px !important;
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

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media screen and (max-width: 500px) {
    .header {
      margin: 10px auto;
      align-items: start;
      flex-direction: column;
    }
  }
`;

// Image URLs
const IMAGES = {
  calendar: "https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png",
  search: "https://admin.aspiraskillhub.aspirasys.com/images/search.png",
  reset: "https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png",
  eye: "https://admin.aspiraskillhub.aspirasys.com/images/eye.png",
  export: "https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
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
  animation: ${spin} 1.5s linear infinite; /* Slower spin */
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

const Timesheet = () => {
  const [state, setState] = useState({
    students: [],
    searchQuery: '',
    currentPage: 1,
    dateFrom: '',
    dateTo: '',
    selectedMonth: '',
    selectedCategory: '',
    selectedGender: '',
    isLoading: true,
    loadProgress: 0
  });

  // Memoized filtered students
  const filteredStudents = useMemo(() => {
    return state.students.filter(student => {
      const matchesSearch = 
        student.full_name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        student.technology_id?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        student.aspirant_id?.toString().includes(state.searchQuery);

      const matchesDateRange =
        (!state.dateFrom || new Date(student.date) >= new Date(state.dateFrom)) &&
        (!state.dateTo || new Date(student.date) <= new Date(state.dateTo));

      const matchesMonth = 
        !state.selectedMonth || student.date?.split('-')[1] === state.selectedMonth;

      const matchesCategory = 
        !state.selectedCategory || student.technology_id === state.selectedCategory;

      const matchesGender = 
        !state.selectedGender || student.gender?.toLowerCase() === state.selectedGender.toLowerCase();

      return matchesSearch && matchesDateRange && matchesMonth && matchesCategory && matchesGender;
    });
  }, [
    state.students, 
    state.searchQuery, 
    state.dateFrom, 
    state.dateTo, 
    state.selectedMonth, 
    state.selectedCategory,
    state.selectedGender
  ]);

  // Pagination data
  const paginationData = useMemo(() => {
    const pages = Math.ceil(filteredStudents.length / 10);
    const start = (state.currentPage - 1) * 10;
    const end = start + 10;
    const paginatedStudents = filteredStudents.slice(start, end);
    
    return { pages, paginatedStudents };
  }, [filteredStudents, state.currentPage]);

  // Fetch students with extended loader
  const fetchTimesheets = useCallback(async () => {
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

      const response = await axios.get('http://localhost:48857/api/admin/aspirants-progress');
      const data = response.data || [];

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          students: data,
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    } catch (error) {
      console.error('Error fetching students:', error.message);
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
  }, []);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      loadProgress: 0
    }));
    fetchTimesheets();
  }, [fetchTimesheets]);

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setState(prev => ({ ...prev, searchQuery: e.target.value, currentPage: 1 }));
  }, []);

  const handleDateFromChange = useCallback((e) => {
    setState(prev => ({ ...prev, dateFrom: e.target.value }));
  }, []);

  const handleDateToChange = useCallback((e) => {
    setState(prev => ({ ...prev, dateTo: e.target.value }));
  }, []);

  const handleMonthChange = useCallback((e) => {
    setState(prev => ({ ...prev, selectedMonth: e.target.value }));
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setState(prev => ({ ...prev, selectedCategory: e.target.value }));
  }, []);

  const handleGenderChange = useCallback((e) => {
    setState(prev => ({ ...prev, selectedGender: e.target.value }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({
      ...prev,
      searchQuery: '',
      dateFrom: '',
      dateTo: '',
      selectedMonth: '',
      selectedCategory: '',
      selectedGender: '',
      currentPage: 1
    }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  return (
    <>
      {state.isLoading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading Timesheet Data...</LoadingText>
          <ProgressBar>
            <Progress progress={state.loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}

      <Wrapper>
        <div className="dateSec">
          <form className="date-header">
            <div className="date-section">
              <div className="date-form">
                <label htmlFor="date-from">From</label>
                <input
                  type="date"
                  name="from"
                  id="date-from"
                  value={state.dateFrom}
                  onChange={handleDateFromChange}
                />
                <div className="date-icon">
                  <img src={IMAGES.calendar} alt="Calendar" />
                </div>
              </div>
              <div className="date-form">
                <label htmlFor="date-to">To</label>
                <input
                  type="date"
                  name="to"
                  id="date-to"
                  value={state.dateTo}
                  onChange={handleDateToChange}
                />
                <div className="date-icon">
                  <img src={IMAGES.calendar} alt="Calendar" />
                </div>
              </div>
            </div>

            <div className="date-section">
              <div className="date-form">
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  id="month"
                  value={state.selectedMonth}
                  onChange={handleMonthChange}
                >
                  <option value="">MM</option>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                    (month, index) => (
                    <option value={(index + 1).toString().padStart(2, '0')} key={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date-form">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={state.selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {[
                    'Basic Web Technology',
                    'Asp Dot Net',
                    'Python',
                    'Java',
                    'Node JS',
                    'React JS',
                    'Angular JS',
                    'Full Stack',
                    'Digital Marketing',
                    'Flutter',
                  ].map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="date-section">
              <div className="date-form">
                <label htmlFor="gender">Gender</label>
                <select 
                  name="gender" 
                  id="gender" 
                  value={state.selectedGender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="src-button">
                <button type="button" className="reset-button" onClick={handleReset}>
                  <img src={IMAGES.reset} alt="Reset" />
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        <Heading title="Timesheet" />
        <div className="list-cont">
          <div className="container-2">
            <div className="header">
              <div className="searchBox">
                <input
                  type="text"
                  placeholder="Search by name, ID or technology"
                  value={state.searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="exportBtn">
                Export XLS
              </Button>
            </div>
            <div className="tab">
              <table className="tab-cols">
                <thead>
                  <tr className="odd odd1">
                    <td>#</td>
                    <td>Aspira ID</td>
                    <td>Name</td>
                    <td>Technology Name</td>
                    <td>Mode</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    paginationData.paginatedStudents.map((student, index) => (
                      <tr className="odd" key={`${student.aspirant_id}-${index}`}>
                        <td>{(state.currentPage - 1) * 10 + index + 1}</td>
                        <td>{student.aspirant_id}</td>
                        <td>{student.full_name}</td>
                        <td>{student.technology}</td>
                        <td>{student.mode}</td>
                        <td className='cut-text'>{student.last_status}</td>
                        <td className="stack-output">
                          <NavLink
                            to='/admin/aspirants-progress/timesheet-detail'
                            state={{ 
                              studentId: student.aspirant_id, 
                              studentName: student.full_name 
                            }}
                          >
                            <button>
                              <img src={IMAGES.eye} alt="View details" />
                            </button>
                          </NavLink>
                          <NavLink
                            to='/admin/aspirants-progress/productive-students'
                            state={{ 
                              studentId: student.aspirant_id, 
                              studentName: student.full_name 
                            }}
                          >
                            <button className="btn re-submit">
                              <span>
                                <img src={IMAGES.export} alt="Export productivity data" />
                              </span>
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className='odd odd2'>
                      <td colSpan="7" className="no-data">
                        {state.searchQuery || state.dateFrom || state.dateTo || 
                         state.selectedMonth || state.selectedCategory || state.selectedGender
                          ? "No matching records found"
                          : "No data available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {filteredStudents.length > 10 && (
          <div className="pagination">
            <Button
              onClick={() => handlePageChange(Math.max(state.currentPage - 1, 1))}
              disabled={state.currentPage === 1}
            >
              Prev
            </Button>
            {[...Array(paginationData.pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={state.currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <Button
              onClick={() => handlePageChange(Math.min(state.currentPage + 1, paginationData.pages))}
              disabled={state.currentPage === paginationData.pages}
            >
              Next
            </Button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Timesheet;