import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Heading from '../../Components/Heading';
import EditModal from './EditModal';
import Button from '../../Components/Button';

const Wrapper = styled.section`
  .container {
    width: 95%;
    margin: 2% auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 5px #00000020;
  }

  .header {
    width: 100%;
    margin:0 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap !important;
    gap: 10px;

    h1 {
      width: 150px;
    }
  }

  .searchBox {
    width: 100%;
    margin: auto;
    text-align: end;

    input {
      max-width: 170px;
      height: 40px;
      padding: 0 10px;
      font-size: 16px;
      border: 1px solid #00000080;
      border-radius: 3px;
    }
  }

  .tab {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .tab-cols-head {
    width: 95%;
    margin: auto;
  }

  .tab-cols {
    width: 100%;
    min-width: 1075px;
    margin-top: 10px;
    overflow-x: scroll;
  }

  .odd {
    height: 45px;
    padding-left: 10px;
    display: grid;
grid-template-columns: .4fr .8fr 1fr .8fr 1.4fr 1fr 0.8fr !important;    grid-template-rows: 45px;
    border: 1px solid #cbcbcb;
    border-top: none;
    align-items: center;
    font-size: 14px;

    td {
      color: #252E4A;
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
    // border-top: 1px solid;

      td {
        color: #757f91;
        position: relative;
        cursor: pointer;
        overflow-x: auto;
        overflow-y: hidden;

        &::before {
          content: '▲';
          position: absolute;
          top: 17.5%;
          right: 10px;
          font-size: 10px;
          width: 0;
          height: 0;
          opacity: .125;
        }

        &::after {
          content: '▼';
          position: absolute;
          bottom: 55%;
          right: 10px;
          font-size: 10px;
          width: 0;
          height: 0;
          opacity: .125;
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

  .del-icon {
      width: 70px;
      height: 70px;
      background: #ff6b63;
      border-radius: 50%;
      padding: 17px;
      margin: 10px auto;
    }

    .modalOverlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modalContent {
      width: 400px;
      background: white;
      padding: 20px;
      font-size: 20px;
      font-weight: 600;
      border-radius: 8px;
      text-align: center;
      position: relative;

      .close-icon {
        position: absolute;
        top: 10px;
        right: 20px;
        color: #666;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .message {
      margin: 16px 0 10px;
    }
    .subMessage {
      margin-top: -5px;
      margin-bottom: 10px;
      display: block;
      font-size: 13px;
      font-weight: 400;
      color: #282828;
    }
    .btn-cont {
      display: flex;
      justify-content: space-between;

      .btn {
        width: 50%;
        margin: 10px;
        padding: 8px 15px;
        background: none;
        color: #3282c4;
        font-size: 16px;
        font-weight: 400;
        border-radius: 5px;
        border: 1px solid #3282c4;

        &.confirm {
          background: #3282c4;
          color: white;
        }
      }
    }

      .pagination {
      margin: 15px 0 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  @media (min-width: 1500px) { 
    .odd {
      font-size: 16px;
      grid-template-columns: .4fr .8fr 1fr .8fr 1.4fr 1fr 0.8fr !important;
      justify-content: center;

      td {
        font-size: 16px;
      }
    }

    .odd2 {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 450px) {

      .header {
        flex-direction: column;
        align-items: start;
      }
      .searchBox {
        text-align: start;
      }
    }
`;

const MyLearnings = () => {

  const [techStacks, setTechStacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTechStack, setCurrentTechStack] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [techStackToDelete, setTechStackToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'timeStamp', direction: 'asc' });

  useEffect(() => {
    fetchTechStacks();
  }, []);

  const fetchTechStacks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/technologies');
      setTechStacks(response.data);
    } catch (error) {
      console.error('Error fetching tech stacks:', error);
    }
  };

  useEffect(() => {
    const storedTechStacks = JSON.parse(localStorage.getItem('techStacks'));
    if (storedTechStacks && storedTechStacks.length > 0) {
      setTechStacks(storedTechStacks);
    } else {
      setTechStacks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techStacks', JSON.stringify(techStacks));
  }, [techStacks]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSaveTechStack = async (newTechStack) => {
    try {
      const response = newTechStack.id
        ? await axios.put(`http://localhost:3000/admin/technologies/update/${newTechStack.id}`, newTechStack)
        : await axios.post('http://localhost:3000/admin/technologies/create', newTechStack);

      setTechStacks((prev) => {
        const exists = prev.some((stack) => stack.id === response.data.id);
        return exists
          ? prev.map((stack) => (stack.id === response.data.id ? response.data : stack))
          : [...prev, response.data];
      });
      fetchTechStacks();
      setModalOpen(false);
      setCurrentTechStack();
    } catch (error) {
      console.error('Error saving tech stack:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };
  const handleDeleteTechStack = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/technologies/delete/${techStackToDelete.id}`);
      setTechStacks((prev) => prev.filter((stack) => stack.id !== techStackToDelete.id));
      setDeleteModalOpen(false);
      setTechStackToDelete(null);
    } catch (error) {
      console.error('Error deleting tech stack:', error);
    }
  };

  const filteredTechStacks = techStacks.filter(
    (stack) =>
      stack.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stack.technolgy_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pages = Math.ceil(filteredTechStacks.length / 10);
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const paginatedTechStacks = filteredTechStacks.slice(start, end);

  const sortTechStacks = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...techStacks].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? 1 : -1;
      if (a[key] > b[key]) return direction === 'asc' ? -1 : 1;
      return 0;
    });
    setTechStacks(sorted);
  };

  const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <div className="close-icon" onClick={onCancel}>✖</div>
        <div className="del-icon">
          <img src="https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png" alt="delete" />
        </div>
        <p className='message'>Are you sure?</p>
        <span className='subMessage'>
          you want to delete <span>{techStackToDelete?.name}</span>
        </span>
        <div className="btn-cont">
          <button onClick={onCancel} className='btn cancel'>No</button>
          <button onClick={onConfirm} className='btn confirm'>Yes, delete</button>
        </div>
      </div>
    </div>
  );

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <Heading title="Tech Stack" />
          <Button className="addBtn" onClick={() => setModalOpen(true)}>
            + Add Tech Stack
          </ Button>
        </div>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="tab">
          <table className="tab-cols">
            <thead>
              <tr className="odd odd1">
                <td>#</td>
                <td
                  onClick={() => sortTechStacks('id')}
                  className={sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  Technology ID
                </td>
                <td
                  onClick={() => sortTechStacks('name')}
                  className={sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  Technology Name
                </td>
                <td
                  onClick={() => sortTechStacks('stages')}
                  className={sortConfig.key === 'stages' ? (sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  Stages
                </td>
                <td
                  onClick={() => sortTechStacks('description')}
                  className={sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  Description
                </td>
                <td
                  onClick={() => sortTechStacks('thumbnail')}
                  className={sortConfig.key === 'thumbnail' ? (sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                >
                  Thumbnail
                </td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredTechStacks.length > 0 ? (
                paginatedTechStacks.map((techStack, index) => (
                  <tr className="odd" key={techStack.id}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{techStack.technolgy_id}</td>
                    <td className='cut-text'>{techStack.name}</td>
                    <td>{techStack.no_stages}</td>
                    <td className='cut-text'>{techStack.description || '-'}</td>
                    <td>
                      {techStack.image ? (
                        <img className='thumb' src={techStack.image} alt={techStack.name} width="50" height="50" />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="stack-output">
                      <NavLink
                        to={`/admin/my-learnings/detail/${techStack.technolgy_id.slice(-2)}`}
                        state={{ techStackName: techStack.name, techStackId: techStack.id, techStackStages: techStack.stages }}
                      >
                        <button>
                          <img src="https://admin.aspiraskillhub.aspirasys.com/images/eye.png" />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => {
                          setCurrentTechStack(techStack);
                          setModalOpen(true);
                        }}
                      >
                        <img src="https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png" />
                      </button>
                      <button
                        onClick={() => {
                          setTechStackToDelete(techStack);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <img src="https://admin.aspiraskillhub.aspirasys.com/images/trash.png" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="odd odd2">
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    No data available in the table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {techStacks.length > 10 && (
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
        {isModalOpen && (
          <EditModal
            isOpen={isModalOpen}
            onClose={() => {
              setModalOpen(false);
              setCurrentTechStack(null);
            }}
            techStack={currentTechStack}
            onSave={handleSaveTechStack} // Pass the correct function
            existingIds={techStacks.map((stack) => stack.technolgy_id)}
          />
        )}
        {isDeleteModalOpen && (
          <ConfirmationModal
            onConfirm={handleDeleteTechStack}
            onCancel={() => setDeleteModalOpen(false)}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default MyLearnings;