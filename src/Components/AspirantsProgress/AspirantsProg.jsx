import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import Timesheet from './Timesheet/Timesheet';
import TrainingPlan from './TrainingPlan/TrainingPlan';
import Certificates from './AspiraCertificate/Certificates';
import Interviews from './Interview/Interviews';

const Wrapper = styled.section`
  .sub-navbar {
    padding: 0 12px;
    background: #fff;
    box-shadow: 0px 2px 12px 1px rgba(6, 40, 61, 0.06);
    margin-bottom: 20px;
    ul {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      li {
        height: 100%;
        font-size: 16px;
        font-weight: 500;
        list-style: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.3s ease;

        a {
          display: block;
          padding: 15px 25px;          
          color: #252e4a;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        &:hover {
          transition: all 0.3s ease;
          border-bottom: 2px solid #0078d7;
          & a {
            color: #0078d7;
          }
        }
        &.active {
          border-bottom: 2px solid #0078d7;
          & a {
            color: #0078d7;
          }
        }
      }
    }
  }

  .container {
    width: 96%;
    height: auto;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 1px rgba(6, 40, 61, 0.06);
    opacity: 0; /* Initial state for animation */
  }
`;


const AspirantsProg = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('timesheet');
  const containerRef = useRef(null);

  // Update active section based on query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('page') || 'timesheet';
    setActiveSection(section);
  }, [location]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeSection]);

  return (
    <Wrapper>
      <nav className="sub-navbar">
        <ul>
          <li className={activeSection === 'timesheet' ? 'active' : ''}>
            <Link to="/admin/aspirants-progress?page=timesheet">Timesheet</Link>
          </li>
          <li className={activeSection === 'trainingPlan' ? 'active' : ''}>
            <Link to="/admin/aspirants-progress?page=trainingPlan">Training Plan</Link>
          </li>
          <li className={activeSection === 'certificates' ? 'active' : ''}>
            <Link to="/admin/aspirants-progress?page=certificates">Certificates</Link>
          </li>
          <li className={activeSection === 'interviews' ? 'active' : ''}>
            <Link to="/admin/aspirants-progress?page=interviews">Interviews</Link>
          </li>
        </ul>
      </nav>

      <div className="container" ref={containerRef}>
        {activeSection === 'timesheet' && <Timesheet />}
        {activeSection === 'trainingPlan' && <TrainingPlan />}
        {activeSection === 'certificates' && <Certificates />}
        {activeSection === 'interviews' && <Interviews />}
      </div>
    </Wrapper>
  );
};

export default AspirantsProg;
