import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../Heading";
import newRegData from "./NewRegApi";

const Wrapper = styled.section`
  /* Container */
  .container {
    width: 96%;
    margin: 2% auto;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Heading */
  h4 {
    margin-bottom: 20px;
    color: #333;
  }

  /* Form */
  .search-form {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 15px;
    margin-bottom: 18px;
    background: #fcfcfc;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
  }

  .filter-group {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: relative;

    padding: 0px;

    input,
    select {
      width: fit-content;
      height: 40px;
      background: rgba(249, 249, 249);
      border-radius: 5px;
      border: 1px solid #dedede;
      outline: none;
      padding: 10px 22px;
      background: none;
    }
    label {
      color: #7a7a7a;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }

  .date-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 22px;
    background: white;
    pointer-events: none;
    bottom: 12px;
    display: flex;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .filter-btn {
    display: flex;
    gap: 15px;

    button {
      height: 40px;
      font-size: 16px;
    }

    .primary {
      background-color: #3282c4;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: none;
      padding: 12px 18px;
    }

    button.secondary {
      padding: 12px;
      border: 2px solid #69a3d4;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: #69a3d4;
      border-radius: 4px;
    }

    .primary:hover {
      background-color: #0056b3;
    }

    .secondary img {
      margin-right: 5px;
    }

    button {
      cursor: pointer;
      background-color: transparent;
    }

    button:hover {
      background-color: transparent;
      opacity: 0.9;
    }
  }

  .form-group label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }

  .form-group input,
  .form-group select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .new {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    gap: 10px;
  }

  .new h2 {
    font-family: sans-serif;
    font-size: 25px;
    color: #272f4b;
  }

  .new .add {
    padding: 8px 18px;
    background-color: #3282c4;
    border-radius: 4px;
    border: none;
    color: white;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }

  .new .add img {
    rotate: 0deg;
    height: 20px;
  }

  .aspirant-table {
    overflow-x: auto;
  }

  /* Table */
  table {
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    margin-top: 20px;
    border: 1px solid #ddd;
  }

  table th,
  table td {
    padding: 10px 20px;
    border: none;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  table th {
    background-color: #ebf3fa;
    color: #252e4a99;
    font-weight: 500;
    font-size: 14px;
  }
  tbody tr {
    color: #252e4a;
    font-weight: 400;
    font-size: 14px;
  }
  .action-button {
    color: #007bff;
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }

  .mail-popup {
    width: 70%;
    height: auto;
    background-color: white;
    margin: 20px auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 8px;
    z-index: 1;
    display: none;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 0 0 0 100rem #3b3a3957;

    .mail-image {
      width: 250px;
      height: 300px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .mail-box {
      width: 650px;
      height: 300px;
      padding: 20px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      text-align: start;

      .mail-head {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        margin-top: -15px;
      }
      h1 {
        text-align: end;
        cursor: pointer;
        font-weight: lighter;
        color: #252e4a99;
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 20px;
      }

      h2 {
        width: 100%;
        font-size: 20px;
        text-align: start;
        // margin-bottom: 10px;
        padding: 0;
      }

      p {
        font-size: 18px;
        color: #333;
        text-align: start;
        margin-bottom: 50px;
      }

      form {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        flex-wrap: wrap;
      }

      .mail-input {
        width: 60%;
        padding: 12px 15px;
        margin-right: 20px;
      }

      .mail-button {
        width: 25%;
        padding: 12px 15px;
        background-color: #3282c4;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
  .pagination {
    width: 100%;
    height: 40px;
    margin: 25px 0 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }
  .pagination button {
    background-color: #f1f1f1;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color 0.3s;
    border: 1px solid #ddd;
  }
  .pagination button.active {
    background-color: #4caf50;
    color: white;
  }
  @media (max-width: 1429px) {
    .mail-popup {
      justify-content: center;
      align-items: center;
    }
    .mail-popup .mail-image {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    .aspirant-table {
      overflow-x: scroll;
    }
  }
  @media (max-width: 768px) {
    .form-group {
      flex: 1 1 100%;
    }
    .new h2 {
      font-family: sans-serif;
      font-size: 100%;
      color: #272f4b;
    }
    .mail-popup .mail-box p {
      display: none;
    }
    .mail-popup .mail-box {
      height: auto;
    }
    .mail-popup .mail-box .mail-button,
    .mail-popup .mail-box .mail-input {
      width: 100%;
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
`;

const NewRegisteration = () => {
  const [aspirants, setAspirants] = useState([...newRegData].reverse());

  const [search, setSearch] = useState({
    date: "",
    name: "",
    mode: "",
    session: "",
    status: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const [filteredAspirants, setFilteredAspirants] = useState(aspirants);
  const [currentPage, setCurrentPage] = useState(1);
  const aspirantsPerPage = 10;

  const handleSearchClick = () => {
    const results = aspirants.filter((aspirant) => {
      return (
        (search.date ? aspirant.date.includes(search.date) : true) &&
        (search.fullName
          ? aspirant.fullName
              .toLowerCase()
              .includes(search.fullName.toLowerCase())
          : true) &&
        (search.mode ? aspirant.mode === search.mode : true) &&
        (search.session ? aspirant.session === search.session : true) &&
        (search.status ? aspirant.status === search.status : true)
      );
    });
    setFilteredAspirants(results);
    setCurrentPage(1);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      date: "",
      name: "",
      mode: "",
      session: "",
      status: "",
    });
    document
      .querySelectorAll(".filter-group input")
      .forEach((input) => (input.value = ""));
    setFilteredAspirants(aspirants);
    setCurrentPage(1);
  };

  const handleOpenMail = () => {
    document.querySelector(".mail-popup").style.display = "flex";
  };

  const handleCloseMail = () => {
    document.querySelector(".mail-popup").style.display = "none";
  };

  const indexOfLastAspirant = currentPage * aspirantsPerPage;
  const indexOfFirstAspirant = indexOfLastAspirant - aspirantsPerPage;
  const currentAspirants = filteredAspirants.slice(
    indexOfFirstAspirant,
    indexOfLastAspirant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <div className="container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="filter-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={search.date}
              onChange={handleSearchChange}
            />
            <div className="date-icon">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/Calendar.png"
                alt="Calendar"
              />
            </div>
          </div>
          <div className="filter-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="fullName"
              value={search.fullName}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-group">
            <label>Mode</label>
            <select
              name="mode"
              value={search.mode}
              onChange={handleSearchChange}
            >
              <option value="">Select Mode</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Session</label>
            <select
              name="session"
              value={search.session}
              onChange={handleSearchChange}
            >
              <option value="">Select Session</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select
              name="status"
              value={search.status}
              onChange={handleSearchChange}
            >
              <option value="">Select Status</option>
              <option value="Access Granted">Access Granted</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div className="filter-btn">
            <button
              type="button"
              className="primary"
              onClick={handleSearchClick}
            >
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/search.png"
                alt=""
              />
            </button>
            <button type="button" className="secondary" onClick={handleReset}>
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png"
                alt=""
              />
              Reset
            </button>
          </div>
        </form>
        <div className="new">
          <Heading title="New Aspirant Access" />
          <button className="primary add" onClick={handleOpenMail}>
            + Add Aspirant
          </button>
        </div>
        <div className="mail-popup">
          <div className="mail-image">
            <img
              src="https://plus.unsplash.com/premium_photo-1671599016130-7882dbff302f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mail Illustration"
            />
          </div>
          <div className="mail-box">
            <div className="mail-head">
              <h1 id="mail-close" onClick={handleCloseMail}>
                ✖
              </h1>
              <h2>Add New Aspirants</h2>
            </div>
            <p>
              Aspirasys Skill Hub is a platform where you can enhance your
              skills and knowledge in various areas of Information Technology.
              The platform provides a comprehensive and structured approach to
              learning, with a focus on practical skills development.
            </p>
            <form action="">
              <input
                type="email"
                placeholder="Enter email"
                className="mail-input"
                required
              />
              <button className="mail-button">Send</button>
            </form>
          </div>
        </div>
        <div className="aspirant-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Name</th>
                <th>Mode</th>
                <th>Session</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAspirants.length > 0 ? (
                currentAspirants.map((aspirant, index) => (
                  <tr key={aspirant.id}>
                    <td>{indexOfFirstAspirant + index + 1}</td>
                    <td>{aspirant.date}</td>
                    <td>{aspirant.fullName}</td>
                    <td>{aspirant.mode}</td>
                    <td>{aspirant.session}</td>
                    <td>{aspirant.status}</td>
                    <td>
                      <button className="action-button">
                        <Link
                          to="/admin/new-registration/aspirants-view"
                          state={{ aspirant }}
                        >
                          <img
                            src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
                            alt="View Aspirant"
                          />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="7">
                    No data available in the table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: "20px 0 0 0",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#3282c4",
                color: "white",
                cursor: "pointer",
              }}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {Math.ceil(aspirants.length / 10)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(aspirants.length / 10))
                )
              }
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#3282c4",
                color: "white",
                cursor: "pointer",
              }}
              disabled={currentPage === Math.ceil(aspirants.length / 10)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewRegisteration;
