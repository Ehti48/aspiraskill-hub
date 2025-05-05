import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Heading from '../../Components/Heading';
import EditModal from './EditModal';
import Button from '../../Components/Button';
import Loader from '../Loader';

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

// Image URLs
const IMAGES = {
  eye: "https://admin.aspiraskillhub.aspirasys.com/images/eye.png",
  edit: "https://admin.aspiraskillhub.aspirasys.com/images/edit-2.png",
  trash: "https://admin.aspiraskillhub.aspirasys.com/images/trash.png",
  deleteIcon: "https://admin.aspiraskillhub.aspirasys.com/images/mdi_trash.png"
};

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-out;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #3498db;
  transition: width 0.3s ease;
`;

const MyLearnings = () => {
  const [state, setState] = useState({
    techStacks: [],
    searchQuery: '',
    currentPage: 1,
    isModalOpen: false,
    currentTechStack: null,
    isDeleteModalOpen: false,
    techStackToDelete: null,
    sortConfig: { key: 'timeStamp', direction: 'asc' },
    isLoading: true,
    loadProgress: 0
  });

  // Memoized filtered tech stacks
  const filteredTechStacks = useMemo(() => {
    return state.techStacks.filter(
      (stack) =>
        stack.name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        stack.technolgy_id?.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.techStacks, state.searchQuery]);

  // Memoized pagination data
  const paginationData = useMemo(() => {
    const pages = Math.ceil(filteredTechStacks.length / 10);
    const start = (state.currentPage - 1) * 10;
    const end = start + 10;
    const paginatedTechStacks = filteredTechStacks.slice(start, end);

    return { pages, paginatedTechStacks };
  }, [filteredTechStacks, state.currentPage]);

  // Fetch tech stacks with extended loader
  const fetchTechStacks = useCallback(async () => {
    const MIN_LOADING_TIME = 2000; // Minimum 2 seconds loading time
    const startTime = Date.now();
    let progressInterval;

    try {
      // Start progress simulation
      progressInterval = setInterval(() => {
        setState(prev => ({
          ...prev,
          loadProgress: Math.min(prev.loadProgress + 10, 90) // Stop at 90% until load completes
        }));
      }, 300);

      const response = await axios.get('https://api.aspiraskillhub.aspirasys.com/admin/technologies');
      const data = response.data || [];

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          techStacks: data,
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    } catch (error) {
      console.error('Error fetching tech stacks:', error);
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
    fetchTechStacks();
  }, [fetchTechStacks]);

  // Local storage effects
  useEffect(() => {
    const storedTechStacks = JSON.parse(localStorage.getItem('techStacks'));
    if (storedTechStacks && storedTechStacks.length > 0) {
      setState(prev => ({ ...prev, techStacks: storedTechStacks }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techStacks', JSON.stringify(state.techStacks));
  }, [state.techStacks]);

  // Event handlers
  const handleSearchChange = useCallback((e) => {
    setState(prev => ({ ...prev, searchQuery: e.target.value, currentPage: 1 }));
  }, []);

  const handleSaveTechStack = useCallback(async (newTechStack) => {
    try {
      const response = newTechStack.id
        ? await axios.put(`https://api.aspiraskillhub.aspirasys.com/admin/technologies/update/${newTechStack.id}`, newTechStack)
        : await axios.post('https://api.aspiraskillhub.aspirasys.com/admin/technologies/create', newTechStack);

      setState(prev => {
        const exists = prev.techStacks.some(stack => stack.id === response.data.id);
        const updatedTechStacks = exists
          ? prev.techStacks.map(stack => (stack.id === response.data.id ? response.data : stack))
          : [...prev.techStacks, response.data];

        return {
          ...prev,
          techStacks: updatedTechStacks,
          isModalOpen: false,
          currentTechStack: null
        };
      });
    } catch (error) {
      console.error('Error saving tech stack:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
    setState(prev => ({ ...prev, isLoading: true }));
    fetchTechStacks();
  }, []);

  const handleDeleteTechStack = useCallback(async () => {
    try {
      await axios.delete(`https://api.aspiraskillhub.aspirasys.com/admin/technologies/delete/${state.techStackToDelete.id}`);
      setState(prev => ({
        ...prev,
        techStacks: prev.techStacks.filter(stack => stack.id !== prev.techStackToDelete.id),
        isDeleteModalOpen: false,
        techStackToDelete: null
      }));
    } catch (error) {
      console.error('Error deleting tech stack:', error);
    }
  }, [state.techStackToDelete]);

  const sortTechStacks = useCallback((key) => {
    let direction = 'asc';
    if (state.sortConfig.key === key && state.sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...state.techStacks].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? 1 : -1;
      if (a[key] > b[key]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setState(prev => ({
      ...prev,
      techStacks: sorted,
      sortConfig: { key, direction }
    }));
  }, [state.techStacks, state.sortConfig]);

  const ConfirmationModal = useCallback(({ onConfirm, onCancel }) => (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <div className="close-icon" onClick={onCancel}>✖</div>
        <div className="del-icon">
          <img src={IMAGES.deleteIcon} alt="delete" />
        </div>
        <p className='message'>Are you sure?</p>
        <span className='subMessage'>
          you want to delete <span>{state.techStackToDelete?.name}</span>
        </span>
        <div className="btn-cont">
          <button onClick={onCancel} className='btn cancel'>No</button>
          <button onClick={onConfirm} className='btn confirm'>Yes, delete</button>
        </div>
      </div>
    </div>
  ), [state.techStackToDelete]);

  return (
    <>
      {state.isLoading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading Tech Stacks...</LoadingText>
          <ProgressBar>
            <Progress progress={state.loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}

      <Wrapper>
        <div className="container">
          <div className="header">
            <Heading title="Tech Stack" />
            <Button
              className="addBtn"
              onClick={() => setState(prev => ({ ...prev, isModalOpen: true }))}
            >
              + Add Tech Stack
            </Button>
          </div>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search"
              value={state.searchQuery}
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
                    className={state.sortConfig.key === 'id' ? (state.sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                  >
                    Technology ID
                  </td>
                  <td
                    onClick={() => sortTechStacks('name')}
                    className={state.sortConfig.key === 'name' ? (state.sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                  >
                    Technology Name
                  </td>
                  <td
                    onClick={() => sortTechStacks('stages')}
                    className={state.sortConfig.key === 'stages' ? (state.sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                  >
                    Stages
                  </td>
                  <td
                    onClick={() => sortTechStacks('description')}
                    className={state.sortConfig.key === 'description' ? (state.sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                  >
                    Description
                  </td>
                  <td
                    onClick={() => sortTechStacks('thumbnail')}
                    className={state.sortConfig.key === 'thumbnail' ? (state.sortConfig.direction === 'asc' ? 'new' : 'old') : ''}
                  >
                    Thumbnail
                  </td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {filteredTechStacks.length > 0 ? (
                  paginationData.paginatedTechStacks.map((techStack, index) => (
                    <tr className="odd" key={techStack.id}>
                      <td>{(state.currentPage - 1) * 10 + index + 1}</td>
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
                          to={`/admin/technologies/stages/${techStack.technolgy_id.slice(-1)}`}
                          state={{
                            techStackName: techStack.name,
                            techStackId: techStack.technolgy_id,
                            techStackStages: techStack.no_stages
                          }}
                        >
                          <button>
                            <img src={IMAGES.eye} alt="View" />
                          </button>
                        </NavLink>
                        <button
                          onClick={() => {
                            setState(prev => ({
                              ...prev,
                              currentTechStack: techStack,
                              isModalOpen: true
                            }));
                          }}
                        >
                          <img src={IMAGES.edit} alt="Edit" />
                        </button>
                        <button
                          onClick={() => {
                            setState(prev => ({
                              ...prev,
                              techStackToDelete: techStack,
                              isDeleteModalOpen: true
                            }));
                          }}
                        >
                          <img src={IMAGES.trash} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="odd odd2">
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      {state.searchQuery ? "No matching tech stacks found" : "No data available in the table"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {state.techStacks.length > 10 && (
            <div className="pagination">
              <Button
                onClick={() => setState(prev => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }))}
                style={{ padding: '8px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#3282c4', color: 'white', cursor: 'pointer' }}
                disabled={state.currentPage === 1}
              >
                Prev
              </Button>
              {[...Array(paginationData.pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setState(prev => ({ ...prev, currentPage: i + 1 }))}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: state.currentPage === i + 1 ? '#3282c4' : 'transparent',
                    color: state.currentPage === i + 1 ? 'white' : '#3282c4',
                    cursor: 'pointer',
                    margin: '0 5px',
                    boxShadow: state.currentPage === i + 1 ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 0px 1px 1px',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                onClick={() => setState(prev => ({ ...prev, currentPage: Math.min(prev.currentPage + 1, paginationData.pages) }))}
                style={{ padding: '8px 15px', border: 'none', borderRadius: '5px', backgroundColor: '#3282c4', color: 'white', cursor: 'pointer' }}
                disabled={state.currentPage === paginationData.pages}
              >
                Next
              </Button>
            </div>
          )}
          {state.isModalOpen && (
            <EditModal
              isOpen={state.isModalOpen}
              onClose={() => setState(prev => ({ ...prev, isModalOpen: false, currentTechStack: null }))}
              techStack={state.currentTechStack}
              onSave={handleSaveTechStack}
              existingIds={state.techStacks.map(stack => stack.technolgy_id)}
            />
          )}
          {state.isDeleteModalOpen && (
            <ConfirmationModal
              onConfirm={handleDeleteTechStack}
              onCancel={() => setState(prev => ({ ...prev, isDeleteModalOpen: false }))}
            />
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default MyLearnings;