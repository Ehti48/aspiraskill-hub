import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { NavLink } from 'react-router-dom';
import Button from '../../Button';
import axios from 'axios';

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

const Timesheet = () => {
  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] = useState(students); // Store filtered students
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get('http://localhost:48857/api/admin/aspirants-progress');
        console.log('API Response:', response.data);
        const data = response.data || [];
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchTimesheets();
  }, []);

  const handleSearchClick = () => {
    const filteredData = filteredStudents.filter((student) => {

      const doesStudentDateFallInRange =
        (!dateFrom || new Date(student.date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(student.date) <= new Date(dateTo));

      const doesStudentMonthMatchSelectedMonth =
        !selectedMonth || student.date.split('-')[1] === selectedMonth;

      const doesStudentCategoryMatchSelectedCategory =
        !selectedCategory || student.technology_id === selectedCategory;

      return (
        doesStudentDateFallInRange &&
        doesStudentMonthMatchSelectedMonth &&
        doesStudentCategoryMatchSelectedCategory
      );
    });

    setFilteredStudents(filteredData);
  };

  const handleDateFromChange = (e) => setDateFrom(e.target.value);
  const handleDateToChange = (e) => setDateTo(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const [selectedGender, setSelectedGender] = useState('');

  // Update selected gender but don't filter yet
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  // Trigger filtering when search button is clicked
  const handleGenderSearch = () => {
    const gender = selectedGender.toLowerCase();
    const filtered = students.filter(
      (student) => student.gender.toLowerCase() === gender || gender === ''
    );
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
    setSelectedMonth('');
    setSelectedCategory('');
    setSelectedGender('');
    setFilteredStudents(students); // Reset filtered students
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    const filtered = students.filter((student) =>
      student.full_name.toLowerCase().includes(query.toLowerCase()) ||
      student.technology_id.toLowerCase().includes(query.toLowerCase()) ||
      student.aspirant_id.toString().includes(query)
    );

    setFilteredStudents(filtered);
  };


  const pages = Math.ceil(filteredStudents.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredStudents.slice(start, end);


  return (
    <Wrapper>
      <div className="dateSec">
        <form className="date-header" action="https://admin.aspiraskillhub.aspirasys.com/admin/aspirants-progress" method="get">
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
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png" alt="Calendar" />
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
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png" alt="Calendar" />
              </div>
            </div>
            <div className="src-button">
              <button type="button" onClick={handleSearchClick}>
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/search.png" alt="Search" />
              </button>
            </div>
          </div>

          <div className="date-section">
            <div className="date-form">
              <label htmlFor="month">Month</label>
              <select
                name="month"
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">MM</option>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                  (month, index) => (
                    <option value={String(index + 1).padStart(2, '0')} key={index}>
                      {month}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="date-form">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
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
              <button type="button" onClick={handleSearchClick}>
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/search.png" alt="Search" />
              </button>
            </div>
          </div>

          <div className="date-section">
            <div className="date-form">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" onChange={handleGenderChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="src-button">
              <button type="button" onClick={handleGenderSearch}>
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/search.png" alt="Search" />
              </button>
              <button type="button" className="reset-button" onClick={handleReset}>
                <img src="https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png" alt="Reset" />
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
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
                  paginatedTechStacks.map((student, index) => (
                    <tr className="odd" key={index}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{student.aspirant_id}</td>
                      <td>{student.full_name}</td>
                      <td>{student.technology}</td>
                      <td>{student.mode}</td>
                      <td className='cut-text'>{student.last_status}</td>
                      <td className="stack-output">
                        <NavLink
                          to='/admin/aspirants-progress/timesheet-detail'
                          state={{ studentId: student.aspirant_id, studentName: student.full_name }}
                        >
                          <button>
                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png" alt="View" />
                          </button>
                        </NavLink>
                        <NavLink
                          to='/admin/aspirants-progress/productive-students'
                          state={{ studentId: student.aspirant_id, studentName: student.full_name }}
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
                  <tr className='odd odd2'>
                    <td colSpan="7" className="no-data"> No data available in the table</td>
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
    </Wrapper>
  );
};

export default Timesheet;
