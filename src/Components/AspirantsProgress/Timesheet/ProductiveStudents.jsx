import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Heading from '../../../Components/Heading';

const Wrapper = styled.section`
.main-bg {
    width: 100%;
    margin: auto;
    padding: 30px;
    padding-top: 0px;
}

.ad-sck {
    margin: 25px 0;
    display: flex;
    list-style: none;
    align-items: center;

    li {
        font-size: 18px;
        font-weight: 500;
        color: #252e4a;

        a {
            color: #787E91;
            font-size: 18px;
            text-decoration: none;
            padding-right: 5px;
        }

        }
        svg {
            font-size: 30px;
            color: #252E4A99;
        }
}

.usertime-name {
    position: relative;
    color: #252E4A;
    font-size: 18px;
    font-weight: 600;
    margin-left: 15px;

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

.user-timesheet {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ProductiveRate {
    margin-bottom: 16px;
    padding: 0px 10px;
    border-left: 4px solid #6AAA43;

    p {
        color: #212529;
    }
}

.journey-timeline {
    margin-bottom: 20px;
    padding: 24px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);

    h6 {
        height: 25px;
        margin-bottom: 24px;
        color: #252E4A;
        font-size: 20px;
        font-weight: 500;
    }
}

.stage-level {
    width: 75%;
    min-width: 650px;
    display: flex;
    justify-content: space-between;
}

.stage-flow {
    display: flex;
    flex-direction: column;

    .productive-time {
        font-size: 14px;
        font-weight: 500;
    }

    .btm-content {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #251E4A;
    }
}


.stage-flow .block {
    width: 132px;
    height: 34px;
    display: inline-block;
    position: relative;
    color: #fff;
    font-size: 14px;
    padding-top: 10px;
    z-index: 999;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 16px;
    background-color: var(--block-color);

    &:after {
        height: 23px;
        display: inline-block;
        background: var(--block-color);
        position: absolute;
        right: -11.5px;
        top: 5px;
        z-index: -1;
        transform: rotate(45deg);
        content: '';
        width: 23px;
    }

    &:before {
        height: 1px;
        display: inline-block;
        background: var(--block-color-2);
        position: absolute;
        right: -140px;
        top: 16.5px;
        z-index: -1;
        content: '';
        width: 140px;
    }
}

.product-rate {
    background: #FFF;
    box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);
    padding: 32px 20px 25px;
    border-radius: 6px;
}

.tech-stack {
    display: flex;
    justify-content: space-between;
    height: 25px;

    .heading {
        height: 25px;
        padding-top: 0px;

        h1 {
            color: #252E4A;
            font-size: 20px;
            font-weight: 500;
            width: 200px;
        }

    }
}

.odd {
    grid-template-columns: 1fr !important;
    place-items: center;
}

.table-responsive {
    margin-top: 20px;
    overflow-x: auto;

    .table {
        width: 100%;
        min-width: 890px;

        thead {
            border: 1px solid rgba(37, 46, 74, 0.2);
            background: #ebf3fa;
        }

        th {
            padding: 15px 0 15px 15px;
            color: #252E4A99;
            font-weight: 450;
            text-align: left;
        }

        td {
            height: 38px;
            padding: 10px 5px 10px 15px;
            color: #252E4A;
            font-weight: 400;
            text-align: left;
        }

        tr {
            display: grid;
            grid-template-columns: 3fr 1fr 1fr;
            font-size: 14px;
            border: 1px solid #cbcbcb;
        }

        tbody {
            tr {
                border-top: none;
            }
        }
    }

    .grand-value {

        td {
            color: #252E4A;
            font-weight: 600;
        }
    }

    .total-value {
        background-color: #3282C4;

        td {
            color: #fff;
        }
    }
}

@media (max-width: 850px) {
    .stage-level {
        width: 100%;
        min-width: 0px;
        flex-direction: column;
    }

    .stage-flow {
        margin-bottom: 50px;
        align-items: center;

        .block {
            width: 150px;

            &:after {
                display: none;
            }

            &:before {
                right: 50px;
                top: 90px;
                z-index: -1;
                content: '';
                width: 50px;
                height: 2px;
                transform: rotate(90deg);
            }
        }
    }
}

@media (max-width: 650px) {
    .user-timesheet {
        flex-direction: column;
        align-items: start !important;
        margin-bottom: 20px;

        .ad-sck {
            margin: 15px 0;
        }
    }
}
`;

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

const ProductiveStudents = () => {
    const location = useLocation();
    const studentId = location.state?.studentId;
    const studentName = location.state?.studentName;

    const [activeStage, setActiveStage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const stages = [
        {
            stageName: 'Stage 01',
            date: '2024-09-30',
            description: 'Web Dev start',
            color: '#FF6636',
            bColor: '#FF6636',
        },
        {
            stageName: 'Stage 02',
            date: '2024-12-29',
            description: 'Advance Tech Start',
            color: '#007BFF',
            bColor: '#007BFF',
        },
        {
            stageName: 'Stage 03',
            date: '2025-06-27',
            description: 'Job ready',
            color: '#28A745',
            bColor: '#28A745',
        },
        {
            stageName: 'Stage 04',
            date: '2025-08-26',
            description: 'Job Hired',
            color: '#FFC107',
            bColor: '#FFC10700',
        },
    ];

    const fetchActiveStage = useCallback(async () => {
        const MIN_LOADING_TIME = 1500; // Minimum 1.5 seconds loading time
        const startTime = Date.now();
        let progressInterval;

        try {
            // Start progress simulation
            progressInterval = setInterval(() => {
                setLoadProgress(prev => Math.min(prev + 10, 90)); // Stop at 90% until load completes
            }, 200);

            const response = await axios.get(`http://localhost:48857/api/admin/timesheet/1/productive-rate`);
            
            // Calculate remaining minimum loading time
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

            setTimeout(() => {
                clearInterval(progressInterval);
                setActiveStage(response.data);
                setLoadProgress(100);
                
                // Small delay to show 100% progress before hiding
                setTimeout(() => setIsLoading(false), 300);
            }, remainingTime);
        } catch (error) {
            console.error('Error fetching active stage:', error);
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

            setTimeout(() => {
                clearInterval(progressInterval);
                setLoadProgress(100);
                setTimeout(() => setIsLoading(false), 300);
            }, remainingTime);
        }
    }, []);

    useEffect(() => {
        fetchActiveStage();
    }, [fetchActiveStage]);

    return (
        <>
            {isLoading && (
                <LoadingOverlay>
                    <Spinner />
                    <LoadingText>Loading Productivity Data...</LoadingText>
                    <ProgressBar>
                        <Progress progress={loadProgress} />
                    </ProgressBar>
                </LoadingOverlay>
            )}

            <Wrapper>
                <div className="main-bg learning-section" id="mainContent">
                    <div className="row">
                        <div className="user-timesheet">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb ad-sck">
                                    <li className="breadcrumb-item">
                                        <Link to="/admin/aspirants-progress">Timesheet</Link>
                                    </li>
                                    <MdKeyboardArrowRight />
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {studentId}
                                    </li>
                                </ol>
                            </nav>
                            <div className="usertime-id">
                                <p className="usertime-name">Aspirant : {studentId} - {studentName}</p>
                            </div>
                        </div>
                        <div className="ProductiveRate green mb-4">
                            <p>Your dedication is truly inspiring.</p>
                        </div>

                        <div className="journey-timeline">
                            <h6 className="font-20 fw_500">Journey Timeline</h6>
                            <div className="timesheet-productive-page">
                                <div className="stage-level">
                                    {stages.map((stage, index) => (
                                        <div key={index} className="stage-flow" style={{ '--block-color': stage.color, '--block-color-2': stage.bColor }}>
                                            <p className="productive-time font-12 fw_500" style={{ color: index === 0 ? stage.color : '#000000aa', marginBottom: '5px' }}>
                                                {stage.stageName}
                                            </p>
                                            <div className="block" style={{ backgroundColor: stage.color }}>
                                                {stage.date}
                                            </div>
                                            <p className="btm-content font-14 fw_500">{stage.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="training-plan-content">
                            <div className="product-rate">
                                <div className="tech-stack d-flex justify-content-between">
                                    <Heading title='Productive rate' />
                                </div>
                                <div className="table-responsive any-role">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Activity Category</th>
                                                <th>Hours</th>
                                                <th>Days</th>
                                            </tr>
                                        </thead>
                                        {isLoading ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                                        Loading productivity data...
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : activeStage ? (
                                            <tbody>
                                                <tr>
                                                    <td>Productive Effort</td>
                                                    <td>{activeStage.productivity?.hours || 0}</td>
                                                    <td>{activeStage.productivity?.days || 0}</td>
                                                </tr>
                                                <tr>
                                                    <td>System/Power issue</td>
                                                    <td>{activeStage.systemIssue?.hours || 0}</td>
                                                    <td>{activeStage.systemIssue?.days || 0}</td>
                                                </tr>
                                                <tr>
                                                    <td>Leave</td>
                                                    <td>{activeStage.leave?.hours || 0}</td>
                                                    <td>{activeStage.leave?.days || 0}</td>
                                                </tr>
                                                <tr>
                                                    <td>Permission</td>
                                                    <td>{activeStage.permission?.hours || 0}</td>
                                                    <td>{activeStage.permission?.days || 0}</td>
                                                </tr>
                                                <tr className="grand-value">
                                                    <td>Grand Total</td>
                                                    <td>{activeStage.totalHours}</td>
                                                    <td>{activeStage.totalDays}</td>
                                                </tr>
                                                <tr className="total-value">
                                                    <td>Productivity Rate</td>
                                                    <td></td>
                                                    <td>{activeStage.productiveEffortPercentage}%</td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="3">No productivity data available</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default ProductiveStudents;
