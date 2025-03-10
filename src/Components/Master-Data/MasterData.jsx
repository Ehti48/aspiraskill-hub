import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Button from "../Button";


const Wrapper = styled.section`
  Wrapper {
    border: none;
  }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
  }

  .master-data {
    width: 100%;
    padding: 20px;
  }

  .stats {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin: 24px 0;
  }
  .stat-card {
    flex: 1;
    min-width: 170px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .status-img {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin-right: 10px;
    background-color: #bb64c2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .status-img.hired-img {
    background-color: #6aaa43;
    padding: 10px;
  }
  .status-img.progress-img {
    background-color: #e46a11;
    padding: 9px;
  }
  .status-img.terminated-img {
    background-color: #e84138;
    padding: 9px;
  }
  .status-img.job-ready-img {
    background-color: #32bbc4;
    padding: 9px;
  }
  .status-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .status-content {
    display: flex;
    flex-direction: column;
    text-align: left;

    h3 {
      font-size: 14px;
      font-weight: 500;
      color: #252e4ae6;
    }
    p {
      font-size: 20px;
      font-weight: 600;
      color: #252e4a;
    }
  }
  .stat-card.total {
    background-color: #fff;
  }

  .stat-card.hired {
    background-color: #fff;
  }

  .stat-card.progress {
    background-color: #fff;
  }

  .stat-card.terminated {
    background-color: #fff;
  }

  .stat-card.job-ready {
    background-color: #fff;
  }

  .success-rate {
    text-align: right;
    height: 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: #252e4a;
      font-size: 18px;
      font-weight: 500;
    }

    p {
      display: flex;
      align-items: center;
      color: #252e4a;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .success-rate span {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-left: 10px;
    color: #747a7a;
    font-weight: 600;

    img {
      margin-top: -1px;
    }
  }

  .aspirant-data {
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid rgba(37, 46, 74, 0.1);
    box-shadow: 0px 2px 12px 1px rgba(6, 40, 61, 0.06);
  }

  .filters {
    display: flex;
    align-items: end;
    column-gap: 20px;
    row-gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    background: var(--Input-default, rgba(222, 222, 222, 0.1));
    border-radius: 4px;
    padding: 16px 20px;

    .filters-input {
      display: flex;
      flex-direction: column;

      label {
        font-size: 16px;
        font-weight: 400;
        color: #252e4a99;
        margin-bottom: 10px;
      }
    }

    input,
    select {
      padding: 10px 15px;
      background-color: #f9f9f9;
      border: 1px solid #00000030;
      border-radius: 5px;
      outline: none;
      flex: 1;
      height: 40px;
      min-width: 170px;

      &:focus {
        background-color: rgba(52, 116, 220, 0.05);
        border: 1px solid rgb(52, 116, 220);
      }
    }
  }

  .tab {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .tab-cols {
    width: 100%;
    min-width: 900px;
    margin-top: 10px;
    overflow-x: scroll;
  }

  .odd {
    height: 45px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 50px 150px 200px 90px 1.5fr 1.2fr 1fr !important;
    grid-template-rows: 45px;
    border: 1px solid #cbcbcb;
    border-top: none;
    align-items: center;
    font-size: 14px;

    td {
      color: #252e4a;
      padding: 10px 15px;
      font-size: 14px;
      font-weight: 400;

      .thumb {
        width: 40px;
        height: auto;
        object-fit: cover;
      }
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
      color: #757f91;
      position: relative;
      cursor: pointer;
      overflow-x: auto;
      overflow-y: hidden;

      &::before {
        content: "▲";
        position: absolute;
        top: 17.5%;
        right: 10px;
        font-size: 10px;
        width: 0;
        height: 0;
        opacity: 0.125;
      }

      &::after {
        content: "▼";
        position: absolute;
        bottom: 55%;
        right: 10px;
        font-size: 10px;
        width: 0;
        height: 0;
        opacity: 0.125;
      }

      &.new::after {
        opacity: 1;
      }
      &.old::before {
        opacity: 1;
      }
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

  table {
    width: 100%;
    margin-top: 20px;
  }

  table thead {
    border: none;
  }

  table th,
  table td {
    padding: 10px 20px;
    border: none;
    text-align: left;
  }
  table th {
    background-color: #ebf3fa;
    color: #252e4a99;
    font-size: 14px;
    font-weight: 500;
  }
  table td {
    color: #252e4a;
    font-size: 14px;
    font-weight: 400;
  }
  .status.hired {
    color: green;
  }
  .status.terminated {
    color: red;
  }
  .action-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  .filter-btn {
    display: flex;
    align-items: end;
    gap: 15px;

    .primary {
      height: 40px;
      background-color: #3282c4;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: none;
      padding: 8px 24px;
    }

    button.secondary {
      height: 40px;
      padding: 10px 12px;
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
      rotate: 215deg;
      transform: rotateX(170deg);
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

  .pagination {
    margin: 15px 0 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 960px) {
    .filters {
      padding: 10px 15px;
    }
    .success-rate {
      h2 {
        font-size: 19px;
      }
      p {
        font-size: 13px;
      }
    }
  }
`;

function MasterData() {
  const [aspirants, setAspirants] = useState([]); // ✅ Fix: Initialize as an empty array
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    technology: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "timeStamp",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedTechStacks = JSON.parse(localStorage.getItem("techStacks"));
    if (storedTechStacks && storedTechStacks.length > 0) {
      setAspirants(storedTechStacks);
    } else {
      setAspirants(initialTechStacks);
    }
  }, []);
  const [filteredAspirants, setFilteredAspirants] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchAspirants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/data/getall"
        );
        console.log("API Response:", response.data); // ✅ Debug API response
        const data = response.data.data || []; // ✅ Ensure it's an array
        // console.log("Formatted Data:", data);
        setAspirants(data);
        setFilteredAspirants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAspirants();
  }, []);

  console.log("Aspirants State:", aspirants); // ✅ Debugging before rendering

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    if (!Array.isArray(aspirants)) return;

    let filtered = aspirants;

    if (filters.name) {
      filtered = filtered.filter(
        (aspirant) =>
          aspirant.name?.toLowerCase().includes(filters.name.toLowerCase()) // ✅ Safe check
      );
    }
    if (filters.gender) {
      filtered = filtered.filter(
        (aspirant) =>
          aspirant.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    if (filters.technology) {
      filtered = filtered.filter(
        (aspirant) =>
          aspirant.technology?.toLowerCase() ===
          filters.technology.toLowerCase()
      );
    }
    if (filters.status) {
      filtered = filtered.filter(
        (aspirant) =>
          aspirant.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredAspirants(filtered);
  };

  const resetFilters = () => {
    setFilters({ name: "", gender: "", technology: "", status: "" });
    setFilteredAspirants(aspirants);
  };

  const sortTechStacks = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...aspirants].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? 1 : -1;
      if (a[key] > b[key]) return direction === "asc" ? -1 : 1;
      return 0;
    });
    setAspirants(sorted);
  };

  const pages = Math.ceil(filteredAspirants.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredAspirants.slice(start, end);

  return (
    <Wrapper>
      <div className="master-data">
        <header className="stats">
          <div className="stat-card total">
            <div className="status-img">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/master-group.png"
                alt=""
              />
            </div>
            <div className="status-content">
              <h3>Total Aspirants</h3>
              <p>{aspirants.length}</p>
            </div>
          </div>
          <div className="stat-card hired">
            <div className="status-img hired-img">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/directbox-notif.png"
                alt=""
              />
            </div>
            <div className="status-content">
              <h3>Hired</h3>
              <p>{aspirants.filter((a) => a.status === "Hired").length}</p>
            </div>
          </div>
          <div className="stat-card progress">
            <div className="status-img progress-img">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/health.png"
                alt=""
              />
            </div>
            <div className="status-content">
              <h3>In Progress</h3>
              <p>
                {aspirants.filter((a) => a.status === "In Progress").length}
              </p>
            </div>
          </div>
          <div className="stat-card terminated">
            <div className="status-img terminated-img">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/clipboard-close.png"
                alt=""
              />
            </div>
            <div className="status-content">
              <h3>Terminated</h3>
              <p>{aspirants.filter((a) => a.status === "Terminated").length}</p>
            </div>
          </div>
          <div className="stat-card job-ready">
            <div className="status-img job-ready-img">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/briefcase.png"
                alt=""
              />
            </div>
            <div className="status-content">
              <h3>Job Ready</h3>
              <p>{aspirants.filter((a) => a.status === "Job Ready").length}</p>
            </div>
          </div>
        </header>

        <section className="aspirant-data">
          <div className="filters">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="technology"
              value={filters.technology}
              onChange={handleFilterChange}
            >
              <option value="">Select Technology</option>
              {[
                "React JS",
                "Node JS",
                "Python",
                "Java",
                "Angular",
                "Vue JS",
                "Django",
                "Ruby on Rails",
                "C#",
                "PHP",
                "Flutter",
                "Swift",
                "Kotlin"
              ].map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Select Status</option>
              <option value="Hired">Hired</option>
              <option value="In Progress">In Progress</option>
              <option value="Terminated">Terminated</option>
            </select>
            <div className="filter-btn">
              <button className="primary" onClick={applyFilters}>
                <img
                  src="https://admin.aspiraskillhub.aspirasys.com/images/search.png"
                  alt=""
                />
              </button>
            </div>
            <div className="filter-btn">
              <button className="secondary" onClick={resetFilters}>
                <img
                  src="https://admin.aspiraskillhub.aspirasys.com/images/rotate-left.png"
                  alt=""
                />
                Reset
              </button>
            </div>
          </div>
          <div className="tab">
            <table className="tab-cols">
              <thead>
                <tr className="odd odd1">
                  <td>#</td>
                  <td
                    onClick={() => sortTechStacks("id")}
                    className={
                      sortConfig.key === "id"
                        ? sortConfig.direction === "asc"
                          ? "new"
                          : "old"
                        : ""
                    }
                  >
                    Technology ID
                  </td>
                  <td
                    onClick={() => sortTechStacks("name")}
                    className={
                      sortConfig.key === "name"
                        ? sortConfig.direction === "asc"
                          ? "new"
                          : "old"
                        : ""
                    }
                  >
                    Technology Name
                  </td>
                  <td
                    onClick={() => sortTechStacks("stages")}
                    className={
                      sortConfig.key === "stages"
                        ? sortConfig.direction === "asc"
                          ? "new"
                          : "old"
                        : ""
                    }
                  >
                    Stages
                  </td>
                  <td
                    onClick={() => sortTechStacks("description")}
                    className={
                      sortConfig.key === "description"
                        ? sortConfig.direction === "asc"
                          ? "new"
                          : "old"
                        : ""
                    }
                  >
                    Description
                  </td>
                  <td
                    onClick={() => sortTechStacks("thumbnail")}
                    className={
                      sortConfig.key === "thumbnail"
                        ? sortConfig.direction === "asc"
                          ? "new"
                          : "old"
                        : ""
                    }
                  >
                    Thumbnail
                  </td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {filteredAspirants.length > 0 ? (
                  paginatedTechStacks.map((aspirant, index) => (
                    <tr className="odd" key={aspirant.id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{aspirant.id}</td>
                      <td>{aspirant.name}</td>
                      <td>{aspirant.gender}</td>
                      <td>{aspirant.technology}</td>
                      <td
                        className={`status ${aspirant.status?.toLowerCase().replace(" ", "-") || ""
                          }`}
                      >
                        {aspirant.status || "N/A"}
                      </td>
                      <td>
                        <Link to="/admin/master-data/view" state={{ aspirant }}>
                          <img
                            src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png"
                            alt="View"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="odd odd2">
                    <td
                      colSpan="7"
                      className="no-data"
                      style={{ textAlign: "center" }}
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredAspirants.length > 10 && (
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
        </section>
      </div>
    </Wrapper>
  );
}

export default MasterData;
