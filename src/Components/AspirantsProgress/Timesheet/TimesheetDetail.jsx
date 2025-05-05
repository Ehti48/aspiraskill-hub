import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import Heading from "../../../Components/Heading";
import Button from "../../../Components/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import ProgressLoader from "../../../Components/ProgressLoader";

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
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ad-sck {
    margin: 25px 0;
    display: flex;
    list-style: none;
    align-items: center;

     svg {
            font-size: 30px;
            color: #252E4A99;
        }

    li {
        font-size: 18px;
        font-weight: 500;
        color: #252e4a;
        a{
            color: #787E91;
            font-size: 18px;
            text-decoration: none;
            padding-right: 5px;
        }
    }
  }

    .usertime-name {
        position: relative;
        color: #252E4A;
        font-size: 18px;
        font-weight: 600;

        &:before {
            position: absolute;
            content: '';
            width: 0px;
            height: 24px;
            border: 4px solid #6AAA43;
            left: -18px;
            top: -4px;
        }
    }

  .date-header {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    row-gap: 2vw;
    align-items: flex-end;
    background: #fcfcfc;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
  }

  .date-section {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    gap: 10px;
  }

  .date-form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;

    label {
        margin-bottom: 12px;
        color: #767A7A;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
    }

    input[type='date'],
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
      background-color: #0078d7;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        padding: 10px 20px;
      }

      &:hover {
        background-color: #005bb5;
      }
    }

    .reset-button {
        padding: 10px 15px;
        height: 36px;
        background: none;
        color: #3282C4;
        font-size: 15px;
        border: 1px solid #7db0d9;

      img {
        margin-right: 5px;
        padding: 0 ;
      }
    }
  }

  ///////////////////////Timesheet Listing////////////////

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

  .tab {
    overflow-x: auto;
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 100% !important;
    min-width: 900px;
    margin: 10px auto;
    overflow-x: scroll;
  }

    td {
      color: #252e4a;
      padding: 10px;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .odd {
    min-width: 770px;
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 0.3fr 1.7fr 1.5fr 2fr 1fr 1.5fr!important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;

     td {
      color: #252e4a;
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

  .cut-text { 
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 160px; 
    height: auto; 
    white-space: nowrap;
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

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 95%;
    margin: 10px auto;
    overflow-x: scroll;
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

  @media (min-width: 1500px) {
    .odd td {
      font-size: 16px !important;
    }
  }

  @media (max-width: 650px) {
    .user-timesheet {
        flex-direction: column;
        align-items: start !important;
        margin-bottom: 20px;

        .ad-sck {
            margin: 15px 0;
        }
    }
}

    @media (max-width: 500px) {
      .header {
        margin: 10px auto !important;
        flex-direction: column;
        align-items: start !important;
      }
    }
`;

const TimesheetDetail = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [hours, setHours] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const location = useLocation();
  const aspirantId = location.state?.aspirantId;
  const userId = location.state?.userId;
  const studentName = location.state?.studentName;

  console.log(userId);
  
  
  

  const idToType = {
    1: "Productive Effort",
    2: "System/Power Issue",
    3: "Leave",
  };

  const filterStudents = useCallback((data, query, from, to, cat, mnth, hrs) => {
    return data.filter(student => {
      const dateMatch =
        (!from || new Date(student.date) >= new Date(from)) &&
        (!to || new Date(student.date) <= new Date(to));
      const categoryMatch =
        !cat || student.type.toLowerCase().includes(cat.toLowerCase());
      const monthMatch = !mnth || student.date.includes(mnth);
      const hoursMatch = !hrs || student.hours === hrs;
      const searchMatch =
        student.date.toLowerCase().includes(query.toLowerCase()) ||
        student.type.toLowerCase().includes(query.toLowerCase());

      return searchMatch && dateMatch && categoryMatch && monthMatch && hoursMatch;
    });
  }, []);

  const handleReset = useCallback(() => {
    document.querySelectorAll("form").forEach((form) => form.reset());
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
    setCategory("");
    setMonth("");
    setHours("");
    setFilteredStudents(students);
    setCurrentPage(1);
  }, [students]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleDateFromChange = (e) => setDateFrom(e.target.value);
  const handleDateToChange = (e) => setDateTo(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleHoursChange = (e) => setHours(e.target.value);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    const filteredData = filterStudents(
      students,
      searchQuery,
      dateFrom,
      dateTo,
      category,
      month,
      hours
    );
    setFilteredStudents(filteredData);
    setCurrentPage(1);
  }, [students, searchQuery, dateFrom, dateTo, category, month, hours, filterStudents]);

  const handleSearchClick = useCallback(() => {
    handleSubmit(new Event("submit"));
  }, [handleSubmit]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = students.filter((student) => {
      const dateMatch = student.date.toLowerCase().includes(value.toLowerCase());
      const categoryMatch = student.type.toLowerCase().includes(value.toLowerCase());
      return dateMatch || categoryMatch;
    });

    setFilteredStudents(filteredData);
    setCurrentPage(1);
  }, [students]);

  // Fetch timesheets with loading progress
  const fetchTimesheet = useCallback(async () => {
    const MIN_LOADING_TIME = 1500; // Minimum 1.5 seconds loading time
    const startTime = Date.now();
    let progressInterval;

    try {
      // Start progress simulation
      progressInterval = setInterval(() => {
        setLoadProgress(prev => Math.min(prev + 10, 90)); // Stop at 90% until load completes
      }, 200);

      // const response = await axios.get(
      //   `https://api.aspiraskillhub.aspirasys.com/api/admin/timesheet/${studentId.slice(4)}`
      // );
      const response = await axios.get(
        `https://api.aspiraskillhub.aspirasys.com/api/admin/timesheet/${userId}`
      );

      const data = response.data || [];
      console.log(data);

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setStudents(data);
        setFilteredStudents(data);
        setLoadProgress(100);

        // Small delay to show 100% progress before hiding
        setTimeout(() => setIsLoading(false), 300);
        console.log(data);
      }, remainingTime);
    } catch (error) {
      console.error("Error fetching data:", error);
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setLoadProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }, remainingTime);
    }
  }, []);

  useEffect(() => {
    fetchTimesheet();
  }, [fetchTimesheet]);

  const { pages, paginatedTechStacks } = useMemo(() => {
    const pages = Math.ceil(filteredStudents.length / 10);
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    const paginatedTechStacks = filteredStudents.slice(start, end);

    return { pages, paginatedTechStacks };
  }, [filteredStudents, currentPage]);

  return (
    <>
      {isLoading && (
        <ProgressLoader progress={loadProgress} />
      )}

      <Wrapper>
        <div className="user-timesheet">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb ad-sck">
              <li className="breadcrumb-item">
                <Link to="/admin/aspirants-progress">Timesheet</Link>
              </li>
              <MdKeyboardArrowRight />
              <li className="breadcrumb-item active" aria-current="page">
                {aspirantId}
              </li>
            </ol>
          </nav>
          <div className="usertime-id">
            <p className="usertime-name">
              Aspirant : {aspirantId} - {studentName}
            </p>
          </div>
        </div>

        <div className="dateSec">
          <form className="date-header" onSubmit={handleSubmit}>
            <div className="date-section">
              <div className="date-form">
                <label htmlFor="date-from">From</label>
                <input
                  type="date"
                  name="from"
                  id="date-from"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  disabled={isLoading}
                />
                <div className="date-icon">
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png"
                    alt="Calendar"
                  />
                </div>
              </div>
              <div className="date-form">
                <label htmlFor="date-to">To</label>
                <input
                  type="date"
                  name="to"
                  id="date-to"
                  value={dateTo}
                  onChange={handleDateToChange}
                  disabled={isLoading}
                />
                <div className="date-icon">
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png"
                    alt="Calendar"
                  />
                </div>
              </div>
              <div className="src-button">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  disabled={isLoading}
                >
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/search.png"
                    alt="Search"
                  />
                </button>
              </div>
            </div>
            <div className="date-section">
              <div className="date-form">
                <label htmlFor="month">Month</label>
                <select
                  name="month"
                  id="month"
                  value={month}
                  onChange={handleMonthChange}
                  disabled={isLoading}
                >
                  <option value="">MM</option>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, index) => (
                    <option
                      value={String(index + 1).padStart(2, "0")}
                      key={index}
                    >
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date-form">
                <label htmlFor="hours">Hours</label>
                <select
                  name="hours"
                  id="hours"
                  value={hours}
                  onChange={handleHoursChange}
                  disabled={isLoading}
                >
                  <option value="">HH</option>
                  {[...Array(12).keys()].map((hour) => (
                    <option value={String(hour).padStart(2, "0")} key={hour}>
                      {String(hour).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date-form">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  disabled={isLoading}
                >
                  <option value="">Select Category</option>
                  {[
                    "Productive Effort",
                    "System/Power issue",
                    "Leave",
                    "Permission",
                    "Assignment",
                    "Project",
                    "Other",
                    "Practice",
                  ].map((category, index) => (
                    <option value={category} key={index}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="src-button">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/search.png"
                    alt="Search"
                  />
                </button>
              </div>
              <div className="src-button">
                <button
                  type="button"
                  className="reset-button"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png"
                    alt="Reset"
                  />
                  Reset
                </button>
              </div>
            </div>
          </form>

          <Heading title="Timesheet" />

          <div className="list-cont">
            <div className="container-2">
              <div className="header">
                <div className="searchBox">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    disabled={isLoading}
                  />
                </div>
                <Button className="exportBtn" disabled={isLoading}>
                  Export XLS
                </Button>
              </div>

              <div className="tab">
                <table className="tab-cols">
                  <thead>
                    <tr className="odd odd1">
                      <td>#</td>
                      <td>Date</td>
                      <td>Activity</td>
                      <td>Description</td>
                      <td>Hours</td>
                      <td>Link</td>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr className="odd odd2">
                        <td colSpan="7" style={{ textAlign: 'center' }}>
                          Loading timesheet data...
                        </td>
                      </tr>
                    ) : filteredStudents.length > 0 ? (
                      paginatedTechStacks.map((student, index) => (
                        <tr className="odd" key={`${student.id}-${index}`}>
                          <td>{(currentPage - 1) * 10 + index + 1}</td>
                          <td className="cut-text">{student.date}</td>
                          <td>{idToType[student.type] || student.type}</td>
                          <td className="cut-text">{student.description}</td>
                          <td>{student.hours}</td>
                          <td className="cut-text">{student.links}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="odd odd2">
                        <td colSpan="7">No data available in the table</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {filteredStudents.length > 10 && (
            <div className="pagination" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                style={{
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: currentPage === 1 ? 'gray' : '#3282c4',
                  color: 'white',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
                disabled={currentPage === 1 || isLoading}
              >
                Prev
              </Button>

              {/* Render page numbers dynamically */}
              {[...Array(pages)].map((_, index) => {
                const page = index + 1;
                // Show first page, last page, current page, and pages near current
                if (
                  page === 1 ||
                  page === pages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: page === currentPage ? '#3282c4' : 'transparent',
                        color: page === currentPage ? 'white' : '#3282c4',
                        cursor: 'pointer',
                        fontWeight: page === currentPage ? 'bold' : 'normal',
                        boxShadow: page !== currentPage ? 'rgba(0, 0, 0, 0.2) 0px 0px 1px 1px' : 'none',
                        margin: '0 2px'
                      }}
                    >
                      {page}
                    </button>
                  );
                }
                // Show dots "..." if there is a gap
                if (
                  (page === currentPage - 2 && page !== 1) ||
                  (page === currentPage + 2 && page !== pages)
                ) {
                  return <span key={page} style={{ margin: '0 5px' }}>...</span>;
                }
                return null;
              })}

              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages))}
                style={{
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: currentPage === pages ? 'gray' : '#3282c4',
                  color: 'white',
                  cursor: currentPage === pages ? 'not-allowed' : 'pointer'
                }}
                disabled={currentPage === pages || isLoading}
              >
                Next
              </Button>
            </div>
          )}

        </div>
      </Wrapper>
    </>
  );
};

export default TimesheetDetail;
