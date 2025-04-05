import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Heading from '../Heading';
import MyChart from '../BarChart';

const Wrapper = styled.section`
    .container {
        width: 100%;
        min-height: 80vh;
        display: flex;
        background: #f5f7fb;
    }

    .sub-cont {
        min-width: 75%;
        padding: 20px;
    }

    .box-cont {
        width: 100%;
        min-height: 85px;
        margin: 10px 0 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;

        .box {
            width: 23%;
            height: 75px;    
            margin: 0;       
            padding: 10px 15px;
            display: flex;
            align-items: center;
            column-gap: 15px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);
            line-height: 1.5;
            overflow: hidden;

            .icon {
                min-width: 40px;
                height: 40px;
                border-radius: 50%;
                padding: 10px;

                svg {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                }
            }

            .count {
                width: 70%;
            }

            p {
                color: #252e4ae6;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.1;
            }

            span {
                color: #252e4a;
                font-size: 20px;
                font-weight: 600;
            }
        }
    }

    .chart-cont {
        width: 100%;
        height: auto;
        margin: auto;
        padding: 20px 30px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);

        .heading {
            margin-bottom: 30px;
        }
    }


    .side-cont {
        min-width: 25%;
        padding: 24px 16px;
        background: #feffff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 15, 0.1), 0px -1px 4px 0px rgba(0, 0, 15, 0.1);
    }

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        h1 {
            font-size: 16px !important;
        }

        button {
            color: #3584c5;
            background: none;
            border: none;
        }
    }

    .box {
        border-radius: 6px;
        background: #feffff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 15, 0.1), 0px -1px 4px 0px rgba(0, 0, 15, 0.1);
        padding: 0px 16px;
        margin-bottom: 30px;
        height: 14em;
        overflow: auto;

    }

    .message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e6e8;
        line-height: 0.8;
        &:last-child {
            border-bottom: none;
        }

        .clock {
            background: #fcd042;
            border-radius: 50%;
            margin-right: 16px;
            display: flex;
            min-width: 36px;
            max-width: 36px;
            height: 36px;
            align-items: center;
            justify-content: center;
        }

        .detail {
            p {
                // max-width: 100px;
                font-size: 14px;
                padding: 20px 0 10px;
                overflow: auto;
            }

            span {
                display: block;
                font-size: 12px;
                color: #252E4A;
                padding: 0 0 10px;
                line-height: 1.2;
            }
        }

        .arrow-bg {
            border-radius: 49%;
            background: #3282c4;
            min-width: 26px;
            height: 26px;
            margin-left: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .box2 {
        padding: 10px 16px;
        height: auto;
    }

    .projects {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        background: #efffe6;
        border: 0.75px solid #6db83f;
        padding: 12px 10px;
        margin-bottom: 16px;

        .netflix {
            margin-right: 10px;
            width: 46px;
            min-width: 40px;
            height: 46px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .detail {
             p {
                max-width: 100px;
                font-size: 14px;
                padding: 0px 0 10px;
                overflow: auto;
                line-height: 1;
            }

            span {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                column-gap: 5px;
                font-size: 12px;
                color: #252E4A;
                line-height: 1;
            }
        }

        .edit {
            border-radius: 49%;
            background: #3282c4;
            width: 30px;
            min-width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
    }
    }

    .proj-content, .msg-content {
        display: flex;
        align-items: center;

    }
    .projects-2 {
        background: #e5ffff;
        border: 0.75px solid rgba(98, 192, 192, 0.5);
        margin-bottom: 0;
    }

    .box3 {
        padding: 12px 12px 10px 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .events-list {
  padding: 10px;
}

.event-item {
  display: flex;
  // align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.event-date {
  // background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 15px;
  text-align: center;
  font-weight: bold;
  min-width: 60px;
}

.event-details {
  flex: 1;
}

.event-details h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
}

.event-details p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 12px;
}

.event-details a {
  float: right;
  color: #3282c4;
  text-decoration: none;
  font-size: 12px;
  display: inline-block;
}

    h3.no-request {
        align-content: center;
        min-height: 200px;
        color: grey;
        font-size: 28px;
        font-weight: 500;
        user-select: none;
        text-align: center;
    }

    @media screen and (max-width: 1024px) {
        .container {
            flex-direction: column;
        }
    }
    @media screen and (max-width: 800px) {
        .box {
            min-width: 49%;
        }
    }
    @media screen and (max-width: 550px) {
        .box {
            min-width: 100%;
        }
    }
`;

// Image URLs
const IMAGES = {
  userGroup: "https://admin.aspiraskillhub.aspirasys.com/images/usergroup.png",
  book: "https://admin.aspiraskillhub.aspirasys.com/images/book.png",
  profileAdd: "https://admin.aspiraskillhub.aspirasys.com/images/profile-add.png",
  briefcase: "https://admin.aspiraskillhub.aspirasys.com/images/briefcase.png",
  clock: "https://admin.aspiraskillhub.aspirasys.com/images/clock.png",
  arrowRight: "https://admin.aspiraskillhub.aspirasys.com/images/arrow-right.png",
  scroll: "https://admin.aspiraskillhub.aspirasys.com/images/scroll.png",
  edit: "https://admin.aspiraskillhub.aspirasys.com/images/edit.png"
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

const Dashboard = () => {
  const [state, setState] = useState({
    totalAspirants: [],
    totalCourses: [],
    studentsEnrolled: [],
    gotJobs: [],
    scrollable: false,
    scrollableProj: false,
    projects: [],
    events: [],
    upcomingEvents: [],
    isLoading: true,
    loadProgress: 0
  });

  const navigate = useNavigate();

  // Memoized data calculations
  const data = useMemo(() => ({
    totalAspirants: state.totalAspirants.length,
    totalCourses: state.totalCourses.length,
    studentsEnrolled: state.studentsEnrolled.length,
    gotJob: state.gotJobs.length,
  }), [
    state.totalAspirants,
    state.totalCourses,
    state.studentsEnrolled,
    state.gotJobs
  ]);

  // Static messages data
  const MESSAGES = useMemo(() => [
    { name: "Mohammed Maaz", status: "On Site (Full time)" },
    { name: "Jane Smith", status: "Remote (Part time)" },
    { name: "Alice Johnson", status: "On Site (Contract)" },
    { name: "Bob Williams", status: "Remote (Full time)" },
    { name: "Chris Evans", status: "On Site (Full time)" },
  ], []);

  // Fetch all data with extended loader
  const fetchAllData = useCallback(async () => {
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

      const [
        aspirantsRes,
        coursesRes,
        enrolledRes,
        jobsRes,
        projectsRes,
        eventsRes,
        upcomingEventsRes
      ] = await Promise.all([
        axios.get('http://localhost:5000/admin/dashboard/totalaspirants'),
        axios.get('http://localhost:5000/admin/dashboard/totalcourses'),
        axios.get('http://localhost:5000/admin/dashboard/enrolled'),
        axios.get('http://localhost:5000/admin/dashboard/getjob'),
        axios.get('http://localhost:5000/admin/dashboard/recentproject'),
        axios.get('http://localhost:5000/admin/dashboard/events'),
        axios.get('http://localhost:48857/api/admin/events')
      ]);

      // Calculate remaining minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        clearInterval(progressInterval);
        setState(prev => ({
          ...prev,
          totalAspirants: aspirantsRes.data || [],
          totalCourses: coursesRes.data || [],
          studentsEnrolled: enrolledRes.data || [],
          gotJobs: jobsRes.data || [],
          projects: (projectsRes.data || []).slice(0, 3),
          events: (eventsRes.data || []).slice(0, 3),
          upcomingEvents: (upcomingEventsRes.data || []).slice(0, 5),
          loadProgress: 100,
          isLoading: false
        }));
      }, remainingTime);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:48857/api/admin/events');
  
        const filteredEvents = response.data;
  
        console.log("Filtered upcoming events:", filteredEvents);
  
        setState(prev => ({ ...prev, upcomingEvents: filteredEvents }));
      } catch (error) {
        console.error("Error fetching real upcoming events:", error);
      }
    };
  
    fetchEvents();
  }, []);
  
  // Event handlers
  const handleClick = useCallback(() => {
    setState(prev => ({ ...prev, scrollable: true }));
  }, []);

  const seeAllProj = useCallback(() => {
    setState(prev => ({ ...prev, scrollableProj: true }));
  }, []);

  return (
    <>
      {state.isLoading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading Dashboard Data...</LoadingText>
          <ProgressBar>
            <Progress progress={state.loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}

      <Wrapper>
        <div className="container">
          <div className="sub-cont">
            <div className="box-cont">
              <div className="box">
                <img src={IMAGES.userGroup} alt="Total Aspirants" />
                <div className="count">
                  <p>Total Aspirants</p>
                  <span>{data.totalAspirants}</span>
                </div>
              </div>
              <div className="box">
                <div className="icon" style={{ background: "#88c264" }}>
                  <img src={IMAGES.book} alt="Total Courses" />
                </div>
                <div className="count">
                  <p>Total Courses</p>
                  <span>{data.totalCourses}</span>
                </div>
              </div>
              <div className="box">
                <div className="icon" style={{ background: "#bb64c2" }}>
                  <img src={IMAGES.profileAdd} alt="Students Enrolled" />
                </div>
                <div className="count">
                  <p>Students Enrolled</p>
                  <span>{data.studentsEnrolled}</span>
                </div>
              </div>
              <div className="box">
                <div className="icon" style={{ background: "#3282c4" }}>
                  <img src={IMAGES.briefcase} alt="Got Job" />
                </div>
                <div className="count">
                  <p>Got Job</p>
                  <span>{data.gotJob}</span>
                </div>
              </div>
            </div>
            <div className="chart-cont">
              <Heading title="Progress Overview" />
              <MyChart />
            </div>
          </div>
          <div className="side-cont">
            <div className="request-box">
              <div className="header">
                <Heading title="Requests" />
                <button onClick={handleClick}>See All</button>
              </div>
              <div
                className="box box1"
                style={{
                  overflowY: state.scrollable ? "scroll" : "hidden",
                  height: state.scrollable ? "14em" : "13em",
                }}
              >
                {MESSAGES.map((message, index) => (
                  <div className="message" key={index}>
                    <div className="msg-content">
                      <div className="clock">
                        <img src={IMAGES.clock} alt="Clock" />
                      </div>
                      <div className="detail">
                        <p>{message.name}</p>
                        <span>{message.status}</span>
                      </div>
                    </div>
                    <div className="arrow-bg">
                      <img src={IMAGES.arrowRight} alt="Arrow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="recentProj-cont">
              <div className="header">
                <Heading title="Recent Projects" />
                <button onClick={seeAllProj}>See All</button>
              </div>
              <div
                className="box box2"
                style={{
                  overflowY: state.scrollableProj ? "scroll" : "hidden",
                  height: state.scrollableProj ? "14em" : "13em"
                }}
              >
                {state.projects.map((project, index) => (
                  <div className="projects" key={index}>
                    <div className="proj-content">
                      <div className="netflix">
                        <img src={project.image} alt={project.title} />
                      </div>
                      <div className="detail">
                        <p>{project.title}</p>
                        <span>
                          <img src={IMAGES.scroll} alt="Tech stack" />
                          {project.techStack}
                        </span>
                      </div>
                    </div>
                    <div className="edit">
                      <img src={IMAGES.edit} alt="Edit" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="upcomingEvents-cont">
              <div className="header">
                <Heading title="Upcoming Events" />
                <button onClick={() => navigate('/admin/events-info')}>See All</button>
              </div>
              <div className="box box3">
                {state.upcomingEvents.length > 0 ? (
                  state.upcomingEvents.map((event) => (
                    <div className="event-item" key={event.id}>
                      <div className="event-date">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.time.slice(0, 5)}</p>
                        <a href={event.joining_link} target="_blank" rel="noopener noreferrer">
                          Join Link
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="motivation-comment">
                    <h3 className="no-request">There are no upcoming events</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;