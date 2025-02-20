import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

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
    border: 1px solid #dedede;
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

  .masterdata-table {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    min-width: 750px;
    border-collapse: collapse;
    margin-top: 20px;
    border: 1px solid #dedede;
  }

  table thead {
    background-color: #f0f0f0;
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
    font-size: 14px;
    font-weight: 500;
  }
  table td {
    background-color: #fff;
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
  const [filteredAspirants, setFilteredAspirants] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchAspirants = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/data/getall");
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
      filtered = filtered.filter((aspirant) =>
        aspirant.name?.toLowerCase().includes(filters.name.toLowerCase()) // ✅ Safe check
      );
    }
    if (filters.gender) {
      filtered = filtered.filter((aspirant) => aspirant.gender?.toLowerCase() === filters.gender.toLowerCase());
    }
    if (filters.technology) {
      filtered = filtered.filter((aspirant) => aspirant.technology?.toLowerCase() === filters.technology.toLowerCase());
    }
    if (filters.status) {
      filtered = filtered.filter((aspirant) => aspirant.status?.toLowerCase() === filters.status.toLowerCase());
    }

    setFilteredAspirants(filtered);
  };


  const resetFilters = () => {
    setFilters({ name: "", gender: "", technology: "", status: "" });
    setFilteredAspirants(aspirants);
  };

  return (
    <Wrapper>
      <div className="master-data">
        <header className="stats">
          <div className="stat-card total">
            <div className="status-img">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/master-group.png" alt="" />
            </div>
            <div className="status-content">
              <h3>Total Aspirants</h3>
              <p>{aspirants.length}</p>
            </div>
          </div>
          <div className="stat-card hired">
            <div className="status-img hired-img">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/directbox-notif.png" alt="" />
            </div>
            <div className="status-content">
              <h3>Hired</h3>
              <p>{aspirants.filter((a) => a.status === "Hired").length}</p>
            </div>
          </div>
          <div className="stat-card progress">
            <div className="status-img progress-img">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/health.png" alt="" />
            </div>
            <div className="status-content">
              <h3>In Progress</h3>
              <p>{aspirants.filter((a) => a.status === "In Progress").length}</p>
            </div>
          </div>
          <div className="stat-card terminated">
            <div className="status-img terminated-img">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/clipboard-close.png" alt="" />
            </div>
            <div className="status-content">
              <h3>Terminated</h3>
              <p>{aspirants.filter((a) => a.status === "Terminated").length}</p>
            </div>
          </div>
          <div className="stat-card job-ready">
            <div className="status-img job-ready-img">
              <img src="https://admin.aspiraskillhub.aspirasys.com/images/briefcase.png" alt="" />
            </div>
            <div className="status-content">
              <h3>Job Ready</h3>
              <p>{aspirants.filter((a) => a.status === "Job Ready").length}</p>
            </div>
          </div>
        </header>

        <section className="aspirant-data">
          <div className="filters">
            <input type="text" name="name" placeholder="Name" value={filters.name} onChange={handleFilterChange} />
            <select name="gender" value={filters.gender} onChange={handleFilterChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="technology" value={filters.technology} onChange={handleFilterChange}>
              <option value="">Select Technology</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
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

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Aspira ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Technology</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAspirants.length > 0 ? (
                filteredAspirants.map((aspirant, index) => (
                  <tr key={aspirant.id}>
                    <td>{index + 1}</td>
                    <td>{aspirant.id}</td>
                    <td>{aspirant.name}</td>
                    <td>{aspirant.gender}</td>
                    <td>{aspirant.technology}</td>
                    <td className={`status ${aspirant.status?.toLowerCase().replace(" ", "-") || ""}`}>
                      {aspirant.status || "N/A"}
                    </td>
                    <td>
                      <Link to="/admin/master-data/view" state={{ aspirant }}>
                        <img src="https://admin.aspiraskillhub.aspirasys.com/images/export-pro.png" alt="View" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </Wrapper>
  );
}

export default MasterData;
