import React, { useState } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { NavLink } from 'react-router-dom';
import { AiTwotoneEye } from 'react-icons/ai';
import Button from '../../Button';

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
    grid-template-columns: 0.3fr 0.7fr 1.5fr 1.5fr 0.8fr 0.7fr 0.6fr !important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;

    td {
      padding: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #252e4a;
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
      font-weight: 500;
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

  .container-2 {
    width: 100%;
  }

  .header {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1vw;
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
    margin: 10px auto;
    overflow-x: scroll;
  }

    td {
      color: #505050;
      padding: 10px;
    }
  }

  .odd1 {
    position: relative;
    top: 4px;
    color: #000000b0;
    background: #ebf3fa;
    font-size: 13px;
    border: 1px solid #cbcbcb;
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
`;

const TrainingPlan = () => {

  const [students, setStudents] = useState([
    { id: 'ASPT0244', techName: 'Basic Web Tech', name: 'Ibrahim.K', interviewCount: '-', performance: '-' },
    { id: 'ASPT0245', techName: 'React JS', name: 'Iqyan', interviewCount: '-', performance: '-' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Wrapper>

      {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to="/admin/aspirants-progress">
                Timesheet
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              / ASP0450
            </li>
          </ol>
        </nav> */}
      <div className="dateSec">
        <Heading title="Interviews" />
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
                    <td>Technology Name</td>
                    <td>Name</td>
                    <td>Interview Count</td>
                    <td>Performance</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr className="odd" key={index}>
                      <td>{index + 1}</td>
                      <td>{student.id}</td>
                      <td>{student.techName}</td>
                      <td>{student.name}</td>
                      <td>{student.interviewCount}</td>
                      <td>{student.performance}</td>
                      <td className="stack-output">
                        <NavLink
                          to='/admin/aspirants-progress/interview-detail'
                          state={{ studentId: student.id, studentName: student.name }}
                        >
                          <button className="btn re-submit">
                            <span>
                              <img src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png" alt="Export" />
                            </span>
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default TrainingPlan;

