import React, { useState } from 'react';
import styled from 'styled-components';
import Heading from '../../Heading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

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
        a{
            color: #787E91;
            font-size: 18px;
            text-decoration: none;
            padding-right: 5px;
        }

      }
        svg {
            color: #252E4A99;
            font-size: 30px;
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
    grid-template-columns: 0.4fr 0.7fr 2fr 1fr 1fr!important;
    border: 1px solid #cbcbcb;
    border-top: none;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
   
    td {
      padding: 10px;
      color: #252E4A;
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
      color: #252E4A99;
      padding: 10px;
    }
  }

  .odd2 {
    grid-template-columns: 1fr !important;
    place-items: center;

    td {
      font-size: 16px !important;
      color: #252E4A99;
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

  @media (max-width: 400px) {
      .btm-header {
        margin-top: 10px !important;
        justify-content: flex-start !important;
      }
  }
`;

const MaterialDetail = () => {

  const [students, setStudents] = useState([
    { type: 'Material', techName: 'Basic Web Tech', status: 'In Progress', },
    { type: 'Material', techName: 'React JS', status: 'In Progress', },
    { type: 'Material', techName: 'Node JS', status: 'In Progress', },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const stageTitle = location.state?.stageTitle;
  const techName = location.state?.techName;
  const studentId = location.state?.studentId;

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredStudents = students.filter(
    (student) =>
      student.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.techName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Wrapper>

      <div className="user-timesheet">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb ad-sck">
            <li className="breadcrumb-item">
              <Link to="/admin/aspirants-progress">
                Training Plan
              </Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item">
              <Link onClick={() => navigate(-2)}>
                {techName}
              </Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item">
              <Link onClick={() => navigate(-1)}>
                {stageTitle}
              </Link>
            </li>
            <MdKeyboardArrowRight />
            <li className="breadcrumb-item active" aria-current="page">
              {studentId}
            </li>
          </ol>
        </nav>
        {/* <div className="usertime-id">
          <p className="usertime-name">
            Aspirant : ASP0244 - Ibrahim.K
          </p>
        </div> */}
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
                    <td className='num'>#</td>
                    <td>Type</td>
                    <td>Technology Name</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr className="odd" key={index}>
                        <td className='num'>{index + 1}</td>
                        <td>{student.type}</td>
                        <td>{student.techName}</td>
                        <td>{student.status}</td>
                        {/* <td className="stack-output">
                      <NavLink to='/admin/aspirants-progress/stages'>
                        <button>
                          <img src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png" />
                        </button>
                      </NavLink>
                      <NavLink to='/admin/aspirants-progress/'>
                        <button className="btn re-submit">
                          <span>
                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png" />
                          </span>
                        </button>
                      </NavLink>
                    </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr className='odd odd2'>
                      <td colSpan="7">No data available in the table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default MaterialDetail;
