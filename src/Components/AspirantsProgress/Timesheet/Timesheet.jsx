import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Heading from '../../Heading';
import Button from '../../Button';
import ProgressLoader from '../../ProgressLoader';

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


  @media screen and (max-width: 500px) {
    .header {
      margin: 10px auto;
      align-items: start;
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

// Image URLs
const IMAGES = {
  calendar: "https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png",
  search: "https://admin.aspiraskillhub.aspirasys.com/images/search.png",
  reset: "https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png",
  eye: "https://admin.aspiraskillhub.aspirasys.com/images/eye.png",
  export: "https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
};

const Timesheet = () => {
  const [state, setState] = useState({
    students: [],
    filters: {
      searchQuery: '',
      dateFrom: '',
      dateTo: '',
      selectedMonth: '',
      selectedCategory: '',
      selectedGender: ''
    },
    appliedFilters: {
      searchQuery: '',
      dateFrom: '',
      dateTo: '',
      selectedMonth: '',
      selectedCategory: '',
      selectedGender: ''
    },
    currentPage: 1,
    isLoading: true,
    loadProgress: 0,
    userIds: []
  });



  // Helper function to format last updated hours
  const formatLastUpdated = (hours) => {
    const absHours = Math.abs(hours);

    // Show days when hours >= 24
    if (absHours >= 24) {
      const days = Math.floor(absHours / 24); // Round to nearest day
      if (hours > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
      return `In ${days} day${days !== 1 ? 's' : ''}`;
    }

    // Original handling for less than 24 hours
    if (hours === 0) return "Just now";
    if (hours > 0) return `${absHours} hour${absHours !== 1 ? 's' : ''} ago`;
    return `In ${absHours} hour${absHours !== 1 ? 's' : ''}`;
  };

  // Memoized filtered students
  const filteredStudents = useMemo(() => {
    return state.students.filter(student => {
      const { searchQuery, dateFrom, dateTo, selectedMonth, selectedCategory, selectedGender } = state.appliedFilters;

      const matchesSearch =
        student.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.technology_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.aspirant_id?.toString().includes(searchQuery);

      const matchesDateRange =
        (!dateFrom || new Date(student.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(student.date) <= new Date(dateTo));

      const matchesMonth =
        !selectedMonth || student.date?.split('-')[1] === selectedMonth;

      const matchesCategory =
        !selectedCategory || student.technology === selectedCategory;

      const matchesGender =
        !selectedGender || student.gender?.toLowerCase() === selectedGender.toLowerCase();

      return matchesSearch && matchesDateRange && matchesMonth && matchesCategory && matchesGender;
    });
  }, [state.students, state.appliedFilters]);


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
    const MIN_LOADING_TIME = 2000;
    const startTime = Date.now();
    let progressInterval;

    try {
      progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          loadProgress: Math.min(prev.loadProgress + 10, 90)
        }));
      }, 300);

      const aspirantsProgressRes = await axios.get('https://api.aspiraskillhub.aspirasys.com/api/admin/aspirants-progress');

      const aspirantsData = Array.isArray(aspirantsProgressRes.data) ? aspirantsProgressRes.data : [];

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          students: aspirantsData,
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);

    } catch (error) {
      console.error('Fetch error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

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

  const applyFilters = useCallback((filterKey) => {
    setState(prev => ({
      ...prev,
      appliedFilters: {
        ...prev.appliedFilters,
        [filterKey]: prev.filters[filterKey]
      },
      currentPage: 1
    }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        searchQuery: value
      }
    }));
  }, []);

  const handleDateFromChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        dateFrom: value
      }
    }));
  }, []);

  const handleDateToChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        dateTo: value
      }
    }));
  }, []);

  const handleMonthChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        selectedMonth: value
      }
    }));
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        selectedCategory: value
      }
    }));
  }, []);

  const handleGenderChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        selectedGender: value
      }
    }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {
        searchQuery: '',
        dateFrom: '',
        dateTo: '',
        selectedMonth: '',
        selectedCategory: '',
        selectedGender: ''
      },
      appliedFilters: {
        searchQuery: '',
        dateFrom: '',
        dateTo: '',
        selectedMonth: '',
        selectedCategory: '',
        selectedGender: ''
      },
      currentPage: 1
    }));
  }, []);


  const handlePageChange = useCallback((page) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  return (
    <>
      {state.isLoading && (
        <ProgressLoader progress={state.loadProgress} />
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
                  value={state.filters.dateFrom}
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
                  value={state.filters.dateTo}
                  onChange={handleDateToChange}
                />
                <div className="date-icon">
                  <img src={IMAGES.calendar} alt="Calendar" />
                </div>
              </div>
              <div className="src-button">
                <button
                  type="button"
                  className="search-button"
                  onClick={() => {
                    applyFilters('dateFrom');
                    applyFilters('dateTo');
                  }}
                >
                  <img src={IMAGES.search} alt="Search" />
                </button>
              </div>
            </div>
            <div className="date-section">
              <div className="date-form">
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  id="month"
                  value={state.filters.selectedMonth}
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
                  value={state.filters.selectedCategory}
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
              <div className="src-button">
                <button
                  type="button"
                  className="search-button"
                  onClick={() => {
                    applyFilters('selectedMonth');
                    applyFilters('selectedCategory');
                  }}
                >
                  <img src={IMAGES.search} alt="Search" />
                </button>
              </div>
            </div>

            <div className="date-section">
              <div className="date-form">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={state.filters.selectedGender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="src-button">
                <button
                  type="button"
                  className="search-button"
                  onClick={() => applyFilters('selectedGender')}
                >
                  <img src={IMAGES.search} alt="Search" />
                </button>
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
                    paginationData.paginatedStudents.map((student, index) => {
                      return (
                        <tr className="odd" key={`${student.aspirant_id}-${index}`}>
                          <td>{(state.currentPage - 1) * 10 + index + 1}</td>
                          <td>{student.aspirant_id}</td>
                          <td>{student.full_name}</td>
                          <td>{student.technology}</td>
                          <td>{student.mode}</td>
                          <td className='cut-text'>
                            {formatLastUpdated(student.last_updated_hours)}
                          </td>
                          <td className="stack-output">
                            <NavLink
                              to={`/admin/aspirants-progress/timesheet-detail/${student.user_id}`}
                              state={{
                                aspirantId: student.aspirant_id,
                                userId: student.user_id,
                                studentName: student.full_name
                              }}
                            >
                              <button>
                                <img src={IMAGES.eye} alt="View details" />
                              </button>
                            </NavLink>

                            <NavLink
                              to={`/admin/aspirants-progress/${student.user_id}/productive-students`}
                              state={{
                                studentId: student.aspirant_id,
                                studentName: student.full_name,
                                userId: student.user_id
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
                      );
                    })
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
          <div className="pagination-controls">
            {state.currentPage > 1 && (
              <button
                className="page-button"
                onClick={() => handlePageChange(state.currentPage - 1)}
              >
                Prev
              </button>
            )}

            {/* Show Pages */}
            {Array.from({ length: paginationData.pages }, (_, index) => index + 1)
              .filter(page => {
                if (paginationData.pages <= 5) {
                  return true; // Show all if total pages <= 5
                }
                if (state.currentPage <= 3) {
                  return page <= 4 || page === paginationData.pages;
                }
                if (state.currentPage >= paginationData.pages - 2) {
                  return page >= paginationData.pages - 3 || page === 1;
                }
                return (
                  page === 1 ||
                  page === paginationData.pages ||
                  (page >= state.currentPage - 1 && page <= state.currentPage + 1)
                );
              })
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 &&
                    page - arr[idx - 1] > 1 && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                  <button
                    className={`page-button ${state.currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            {state.currentPage < paginationData.pages && (
              <button
                className="page-button"
                onClick={() => handlePageChange(state.currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Timesheet;