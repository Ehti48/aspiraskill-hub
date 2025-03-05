import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "../../../Components/Heading";
import { Link, useLocation } from "react-router-dom";
import Button from "../../../Components/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";

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
    grid-template-columns: 0.3fr 1.7fr 1fr 3fr 1fr 1.5fr!important;
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

  const handleReset = () => {
    document.querySelectorAll("form").forEach((form) => form.reset());
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
    setCategory("");
    setMonth("");
    setHours("");
    setFilteredStudents(students);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleDateFromChange = (e) => setDateFrom(e.target.value);
  const handleDateToChange = (e) => setDateTo(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleHoursChange = (e) => setHours(e.target.value);

  const location = useLocation();
  const studentId = location.state?.studentId;
  const studentName = location.state?.studentName;

  useEffect(() => {
    const fetchTimesheet = async () => {
      try {
        const response = await axios.get(
          "http://localhost:48857/api/admin/timesheets"
        );
        console.log("API Response:", response.data?.timesheets);
        const data = response.data?.timesheets || [];
        console.log("Formatted Data:", data);
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTimesheet();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = students.filter((student) => {
      const dateMatch =
        (!dateFrom || new Date(student.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(student.date) <= new Date(dateTo));
      const categoryMatch =
        !category ||
        student.type.toLowerCase().includes(category.toLowerCase());
      const monthMatch = !month || student.date.includes(month);
      const hoursMatch = !hours || student.hours === hours;

      return (
        (student.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
        dateMatch &&
        categoryMatch &&
        monthMatch &&
        hoursMatch
      );
    });

    setFilteredStudents(filteredData); // Set filtered students after button click
  };

  const handleSearchClick = () => {
    handleSubmit(new Event("submit"));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredData = students.filter((student) => {
      const dateMatch = student.date.toLowerCase().includes(value.toLowerCase());
      const categoryMatch = student.type.toLowerCase().includes(value.toLowerCase());

      return dateMatch || categoryMatch;
    });

    setFilteredStudents(filteredData);
  };

  const pages = Math.ceil(filteredStudents.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredStudents.slice(start, end);

  return (
    <Wrapper>
      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to="/admin/aspirants-progress">Timesheet</Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {studentId}
            </li>
          </ol>
        </nav>
        <div className="usertime-id">
          <p className="usertime-name">
            Aspirant : {studentId} - {studentName}
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
              />
              <div className="date-icon">
                <img
                  src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png"
                  alt="Calendar"
                />
              </div>
            </div>
            <div className="src-button">
              <button type="button" onClick={handleSearchClick}>
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
                />
              </div>
              <Button className="exportBtn">Export XLS</Button>
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
                  {filteredStudents.length > 0 ? (
                    paginatedTechStacks.map((student, index) => (
                      <tr className="odd" key={index}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td className="cut-text">{student.date}</td>
                        <td>{student.type}</td>
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

export default TimesheetDetail;
