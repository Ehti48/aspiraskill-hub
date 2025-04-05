import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import Main from './Main';
import Heading from './Heading';

const Wrapper = styled.section`
  ::-webkit-scrollbar {
    display: none;
  }
  .layout {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .sideBar {
    width: 23%;
    min-width: 240px;
    max-width: 240px;
    height: 100vh;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #192030;
    transition: all 0.3s ease-in-out;

    &.hide {
      width: 23%;
      min-width: 240px;
      max-width: 240px;
      span {
        display: block !important;
      }
    }

    .logo,
    .logo2 {
      width: 80%;
      font-size: 25px;
      color: #fff;
      margin: 10px auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo2 {
      display: none;
    }

    .list-cont {
      width: 100%;
      height: 90%;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      color: #fff;

      a {
        text-decoration: none;
      }

      .list-item {
        margin: 5px 0;
        padding: 6px 14px;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
        font-size: 15px !important;
        color: #a5bacd;
        border: 2px solid #0000001c;
        cursor: pointer;
        transition: background 0.3s, color 0.3s;

        span {
          min-width: 150px;
        }

        .icon {
          width: 20px;
          height: 20px;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        &:hover {
          background: #02335f;
        }

        &.active {
          padding: 14px;
          background: #3282c4;
          color: #fff;
          border: 2px solid #134795;
          border-radius: 6px;         
        }
      }
    }

    .logOut-btn {
      width: 85%;
    }
  }

  .user-dropdown {
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
  }

  .dropdown-content {
    min-width: 240px;
    height: 0;
    margin-top: 8px;
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(6, 40, 61, 0.03) 0px 1px 4px 2px;
    overflow: hidden;
    transition: all 0.4s ease-in;

    a {
      text-decoration: none;
    }

    p {
      display: flex;
      justify-content: start;
      gap: 20px;
      margin: 15px 10px -15px 10px;
      border-radius: 5px;
      padding: 10px 20px;
      color: #767a7a;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: #3282c4;
        color: #fff;
      }

      svg {
        stroke: #767a7a;
      }

      &:hover svg {
        stroke: #fff;
      }
    }
  }

  .user-cont {
    padding-right: 10px;
    display: flex;
    justify-content: end;
    align-items: end;
    column-gap: 15px;

    img {
      margin-bottom: 3px;
    }

    .user-img {
      width: 45px;
      height: 45px;
      margin-bottom: 6px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      h1 {
        margin-top: 5px;
        font-size: 16px;
      }

      h2 {
        color: #699765;
        font-size: 12px;
        font-weight: 600;
        padding: 6px;
        border-radius: 4px;
        background: rgba(105, 151, 101, 0.16);
        width: fit-content;
      }
    }
  }

  .main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .navbar {
    width: 100%;
    height: 82px;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 15px;
    background: #fff;
    box-shadow: 0px 1px 4px 2px rgba(6, 40, 61, 0.03);
    z-index: 999;

    span {
      color: #252e4a;
      font-size: 21px;
      font-weight: 600;
    }

    .icon-btn {
      margin-top: 5px;
      height: 25px;
      background: none;
      border: none;

      svg {
        font-size: 22px;
      }
    }
  }

  .hamburger {
    display: none;
  }

  footer {
    height: 45px;
    padding-top: 10px;
    background: #f5f7fb;
    text-align: center;

    p {
      color: #252e4a80;
      font-size: 12px;
      font-weight: 450;
    }
  }

   .logo2 {
      display: none;
    }

  @media (min-width: 1050px) {
    .logo2 {
      display: none !important;
    }
  }

  @media (max-width: 1050px) {
    .hamburger {
      display: block;
    }

    .sideBar {
      min-width: 100px;
      max-width: 100px;
      padding-top: 0;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          display: none;
        }

        .logo2 {
          display: block;
        }
      }

      &.hide .logo img {
        display: block;
      }

      .list-cont {
        padding-top: 10px;

        .list-item {
          height: 35px;
          margin: 5px 0;
          padding: 0;
          justify-content: center;

          &.active {
            min-width: 50px;
            height: 45px;
          }

          span {
            display: none;
          }
        }
      }

      .logOut-btn {
        width: 55% !important;

        span {
          display: none;
        }
      }
    }
  }

  @media (max-width: 769px) {
    .sideBar {
      min-width: 0;
      max-width: 0;
      position: absolute;
      overflow: hidden;

      &.hide {
        position: absolute;
        z-index: 999;
      }

      .logo {
        display: none;
      }

      .list-cont {
        margin-top: 100px;
      }
    }
  }

  @media (max-width: 650px) {
    .user-name,
    .arrow-img {
      display: none;
    }
  }
`;

const DashboardLayout = ({ onLogout}) => {
  const [headerText, setHeaderText] = useState("Dashboard");
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const name = localStorage.getItem("username");
  const handleDropdown = () =>
    setIsDropdownOpen(!isDropdownOpen);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const logo2 = document.querySelector(".logo2");
    if (logo2) {
      logo2.style.display = isSidebarOpen && window.innerWidth <= 1050 ? "block" : "none";
    }
  };

  useEffect(() => {
    const headerMap = {
      "/admin/my-learnings": "My Learnings",
      "/admin/aspirants-progress": "Aspirants Progress",
      "/admin/new-registration": "New Registration",
      "/admin/events-info": "Events & Info",
      "/admin/master-data": "Master Data",
      "/admin/roles": "Roles",
      "/admin/sub-admin": "Sub Admin",
    };

    const matchedHeader = Object.keys(headerMap).find(path =>
      location.pathname.startsWith(path)
    );
    setHeaderText(matchedHeader ? headerMap[matchedHeader] : "Dashboard");
  }, [location]);

  return (
    <Wrapper>
      <div className="layout">
        <aside className={isSidebarOpen ? "sideBar hide" : "sideBar"}>
          <div className="top-sec">
            <div className="logo">
              <img
                src="https://admin.aspiraskillhub.aspirasys.com/images/dashboard-logo.png"
                alt="aspira_logo"
                class="as-logo"
              />
              <img
                className="logo2"
                src="https://admin.aspiraskillhub.aspirasys.com/images/mobile-logo.png"
                alt=""
              />
            </div>
            <div className="list-cont">
              <NavLink
                to="/"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Dashboard");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/home">
                      <g id="home">
                        <path
                          id="Vector"
                          d="M10 15V12.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M8.39172 2.35004L2.61672 6.97504C1.96672 7.4917 1.55006 8.58337 1.69172 9.40004L2.80006 16.0334C3.00006 17.2167 4.13339 18.175 5.33339 18.175H14.6667C15.8584 18.175 17.0001 17.2084 17.2001 16.0334L18.3084 9.40004C18.4417 8.58337 18.0251 7.4917 17.3834 6.97504L11.6084 2.35837C10.7167 1.6417 9.27506 1.6417 8.39172 2.35004Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin/my-learnings"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("My Learnings");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/note-2">
                      <g id="note-2">
                        <path
                          id="Vector"
                          d="M18.05 8.69992L17.2333 12.1833C16.5333 15.1916 15.15 16.4083 12.55 16.1583C12.1333 16.1249 11.6833 16.0499 11.2 15.9333L9.79999 15.5999C6.32499 14.7749 5.24999 13.0583 6.06665 9.57493L6.88332 6.08326C7.04999 5.37493 7.24999 4.75826 7.49999 4.24993C8.47499 2.23326 10.1333 1.69159 12.9167 2.34993L14.3083 2.67493C17.8 3.49159 18.8667 5.21659 18.05 8.69992Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M12.5498 16.1583C12.0331 16.5083 11.3831 16.8 10.5915 17.0583L9.2748 17.4917C5.96646 18.5583 4.2248 17.6667 3.1498 14.3583L2.08313 11.0667C1.01646 7.75833 1.8998 6.00833 5.20813 4.94167L6.5248 4.50833C6.86646 4.4 7.19146 4.30833 7.4998 4.25C7.2498 4.75833 7.0498 5.375 6.88313 6.08333L6.06646 9.575C5.2498 13.0583 6.3248 14.775 9.7998 15.6L11.1998 15.9333C11.6831 16.05 12.1331 16.125 12.5498 16.1583Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M10.5332 7.1084L14.5749 8.1334"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_4"
                          d="M9.7168 10.3333L12.1335 10.9499"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>My Learnings</span>
              </NavLink>
              <NavLink
                to="/admin/aspirants-progress"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Aspirants Progress");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/book">
                      <g id="book">
                        <path
                          id="Vector"
                          d="M2.91669 15V5.83333C2.91669 2.5 3.75002 1.66666 7.08335 1.66666H12.9167C16.25 1.66666 17.0834 2.5 17.0834 5.83333V14.1667C17.0834 14.2833 17.0834 14.4 17.075 14.5167"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M5.29169 12.5H17.0834V15.4167C17.0834 17.025 15.775 18.3333 14.1667 18.3333H5.83335C4.22502 18.3333 2.91669 17.025 2.91669 15.4167V14.875C2.91669 13.5667 3.98335 12.5 5.29169 12.5Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M6.66669 5.83334H13.3334"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_4"
                          d="M6.66669 8.75H10.8334"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>Aspirants Progress</span>
              </NavLink>
              <NavLink
                to="/admin/new-registration"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("New Registration");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/user-add">
                      <g id="user-add">
                        <path
                          id="Vector"
                          d="M9.99998 10C12.3012 10 14.1666 8.13452 14.1666 5.83333C14.1666 3.53215 12.3012 1.66667 9.99998 1.66667C7.69879 1.66667 5.83331 3.53215 5.83331 5.83333C5.83331 8.13452 7.69879 10 9.99998 10Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M2.84167 18.3333C2.84167 15.1083 6.05 12.5 10 12.5C10.8 12.5 11.575 12.6083 12.3 12.8083"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M18.3334 15C18.3334 15.2667 18.3 15.525 18.2334 15.775C18.1584 16.1083 18.025 16.4333 17.85 16.7167C17.275 17.6833 16.2167 18.3333 15 18.3333 ```javascript
                                            C14.1417 18.3333 13.3667 18.0083 12.7834 17.475C12.5334 17.2583 12.3167 17 12.15 16.7167C11.8417 16.2167 11.6667 15.625 11.6667 15C11.6667 14.1 12.025 13.275 12.6084 12.675C13.2167 12.05 14.0667 11.6667 15 11.6667C15.9834 11.6667 16.875 12.0917 17.475 12.775C18.0084 13.3667 18.3334 14.15 18.3334 15Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <g id="Group">
                          <path
                            id="Vector_4"
                            d="M16.2417 14.9833H13.7584"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            id="Vector_5"
                            d="M15 13.7667V16.2583"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>New Registration</span>
              </NavLink>
              <NavLink
                to="/admin/events-info"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Events & Info");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/calendar-2">
                      <g id="calendar-2">
                        <path
                          id="Vector"
                          d="M6.66669 1.66667V4.16667"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M13.3333 1.66667V4.16667"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M2.91669 7.575H17.0834"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_4"
                          d="M17.5 7.08333V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08333C2.5 4.58333 3.75 2.91667 6.66667 2.91667H13.3333C16.25 2.91667 17.5 4.58333 17.5 7.08333Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_5"
                          d="M9.99626 11.4167H10.0037"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_6"
                          d="M6.91191 11.4167H6.91939"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_7"
                          d="M6.91191 13.9167H6.91939"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>Events & Info</span>
              </NavLink>
              <NavLink
                to="/admin/master-data"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Master Data");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/layer">
                      <g id="layer">
                        <path
                          id="Vector"
                          d="M10.8417 2.43333L15.7583 4.61667C17.175 5.24167 17.175 6.275 15.7583 6.9L10.8417 9.08333C10.2833 9.33333 9.36666 9.33333 8.80833 9.08333L3.89166 6.9C2.475 6.275 2.475 5.24167 3.89166 4.61667L8.80833 2.43333C9.36666 2.18333 10.2833 2.18333 10.8417 2.43333Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M2.5 9.16666C2.5 9.86666 3.025 10.675 3.66667 10.9583L9.325 13.475C9.75833 13.6667 10.25 13.6667 10.675 13.475L16.3333 10.9583C16.975 10.675 17.5 9.86666 17.5 9.16666"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M2.5 13.3333C2.5 14.1083 2.95833 14.8083 3.66667 15.125L9.325 17.6417C9.75833 17.8333 10.25 17.8333 10.675 17.6417L16.3333 15.125C17.0417 14.8083 17.5 14.1083 17.5 13.3333"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>Master Data</span>
              </NavLink>
              <NavLink
                to="/admin/roles"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Roles");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="2.5"
                      ry="2.5"
                    ></rect>
                    <path d="M16 11.37V17M8 11.37V17M12 2L12 17"></path>
                  </svg>
                </div>
                <span>Roles</span>
              </NavLink>
              <NavLink
                to="/admin/sub-admin"
                className="list-item"
                activeClassName="active"
                onClick={() => {
                  setHeaderText("Sub Admin");
                  setIsSidebarOpen(false);
                }}
              >
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4V21M5.16 16H18.84M1 11H23"></path>
                  </svg>
                </div>
                <span>Sub Admin</span>
              </NavLink>
            </div>
          </div>
          <div className="logOut-btn">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "10px 15px",
                cursor: "pointer",
                background: "none",
                color: "#a5bacd",
                border: "none",
                fontSize: "18px",
              }}
              onClick={() => {
                setTimeout(() => {
                  onLogout();
                }, 1000);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="vuesax/linear/logout">
                  <g id="logout">
                    <path
                      id="Vector"
                      d="M7.4165 6.29995C7.67484 3.29995 9.2165 2.07495 12.5915 2.07495H12.6998C16.4248 2.07495 17.9165 3.56662 17.9165 7.29162V12.725C17.9165 16.45 16.4248 17.9416 12.6998 17.9416H12.5915C9.2415 17.9416 7.69984 16.7333 7.42484 13.7833"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      id="Vector_2"
                      d="M12.4999 10H3.0166"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      id="Vector_3"
                      d="M4.87516 7.20825L2.0835 9.99992L4.87516 12.7916"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </aside>
        <div className="main">
          <header className="navbar">
            <div className="hamburger">
              <button className="icon-btn" onClick={handleToggle}>
                <FaBars />
              </button>
            </div>
            <div className="list-name">
              <span>{headerText}</span>
            </div>

            <div className="user-dropdown">
              <div className="user-cont" onClick={handleDropdown}>
                <div className="user-img">
                  <img
                    src="https://admin.aspiraskillhub.aspirasys.com/images/no-image.png"
                    alt=""
                  />
                </div>
                <div className="user-name">
                  <h2>Admin</h2>
                  <Heading title={name || "Ehtishamul Haque"} />
                </div>
                <img
                  className="arrow-img"
                  src="https://admin.aspiraskillhub.aspirasys.com/images/arrowdown.png"
                  alt=""
                />
              </div>

              <div className="dropdown-content" style={{ height: isDropdownOpen ? "120px" : "0" }}>
                <Link to="/admin/profile" onClick={() => setIsDropdownOpen(false)}>
                  <p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="user">
                        <g id="vuesax/linear/user">
                          <g id="user_2">
                            <path
                              id="Vector"
                              d="M10 10.0003C12.3012 10.0003 14.1667 8.13485 14.1667 5.83366C14.1667 3.53247 12.3012 1.66699 10 1.66699C7.69885 1.66699 5.83337 3.53247 5.83337 5.83366C5.83337 8.13485 7.69885 10.0003 10 10.0003Z"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              id="Vector_2"
                              d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    My Profile
                  </p>
                </Link>
                <p onClick={() => setTimeout(onLogout, 1000)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="vuesax/linear/logout">
                      <g id="logout">
                        <path
                          id="Vector"
                          d="M7.4165 6.29995C7.67484 3.29995 9.2165 2.07495 12.5915 2.07495H12.6998C16.4248 2.07495 17.9165 3.56662 17.9165 7.29162V12.725C17.9165 16.45 16.4248 17.9416 12.6998 17.9416H12.5915C9.2415 17.9416 7.69984 16.7333 7.42484 13.7833"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_2"
                          d="M12.4999 10H3.0166"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          id="Vector_3"
                          d="M4.87516 7.20825L2.0835 9.99992L4.87516 12.7916"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Logout
                </p>
              </div>
            </div>
          </header>
          <Main />
          <footer>
            <p> © 2023 AspiraSys. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default DashboardLayout;
