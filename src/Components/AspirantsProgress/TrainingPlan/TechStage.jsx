import React, { useState, useEffect } from 'react'
import axios from "axios";
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../Components/Button'
import { MdKeyboardArrowRight } from "react-icons/md";
import Loader from '../../../Components/Loader';

const Wrapper = styled.section`

.container {
    padding: 20px;
}

.breadcrumb {
    margin: 0;
    padding: 0 12px 35px;
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
        }
    }

        svg {
            color: #252E4A99;
            font-size: 30px;
        }
  }

  .card-sec { 
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 25px;
    padding: 20px 20px 0 12px;

    .card {
        border-radius: 6px;
        background: #fff;
        box-shadow: 0px 3px 3px 2px rgba(6, 40, 61, 0.05);
        padding: 12px;

        .card-body {
            display: flex;
            justify-content: center;
            flex-direction: column;

            .card-img {
                width: 220px;
                height: 140px;
                background: #f0f0f0;
                object-fit: contain;
            }

            h3 {
                padding: 10px 0 5px 0; 
                font-size: 16px;
                font-weight: 500;
                color: #252E4A;
                line-height: 1.2;
            }

            p {
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 500;
                color: #252E4A99;
                position: relative;

                span {
                    position: absolute;
                    right: 0;
                    color: #6AAA43;
                }
            }

            .range {
                display: inline-flex;
                margin-bottom: 15px;
            }

           .range-input {
              -webkit-appearance: none;
              appearance: none; 
              width: 100%;
              cursor: pointer;
              outline: none;
              border-radius: 15px;
              height: 6px;
              background: #ccc;
              overflow: hidden;
            }

            .range-input::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none; 
              height: 0;
              width: 0px;
              background-color: #3282c4;
              border: none;
              transition: .2s ease-in-out;
            }

            .range-input::-moz-range-thumb {
              height: 0px;
              width: 10px;
              background-color: #f50;
              border-radius: 50%;
              border: none;
              transition: .2s ease-in-out;
            }

        }

        a {
            text-decoration: none;
        }

            button {
                width: 100%;
                padding: 12px;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    display: inline-flex;
                    padding-left: 8px;
                }
            }
        }
    }
  }

  @media (max-width: 650px) {

  .breadcrumb {
      padding: 0px !important;
  }
   .ad-sck {
    flex-wrap: wrap;
    row-gap: 10px;
    li, a {
        font-size: 14px !important;
    }
   }

   .card-sec {
       justify-content: center;
   }
  }
`

const TechStage = () => {
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const techId = location.state?.techId;
    const studentId = location.state?.studentId;
    const techName = location.state?.techName;

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:48857/api/admin/aspirants-progress/stages/${techId}/${studentId}`
                );
                setStages(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching stages:", err);
                setError("Failed to fetch stages. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, [techId, studentId]);

    const getRangeStyle = (value) => ({
        background: `linear-gradient(to right, #3282c4 ${value}%, #ddd ${value}%)`,
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Wrapper>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb ad-sck">
                        <li className="breadcrumb-item">
                            <Link to="/admin/aspirants-progress">Training Plan</Link>
                        </li>
                        <MdKeyboardArrowRight />
                        <li className="breadcrumb-item">
                            <Link onClick={() => navigate(-1)}>{techName}</Link>
                        </li>
                        <MdKeyboardArrowRight />
                        <li className="breadcrumb-item active" aria-current="page">
                            {techId}
                        </li>
                    </ol>
                </nav>
                <div className="card-sec">
                    {stages.map((stage, index) => {
                        const progress = parseFloat(stage.completion_percentage); // Convert percentage to number
                        return (
                            <div key={stage.stage_id} className="card">
                                <div className="card-body">
                                    <img
                                        src="https://admin.aspiraskillhub.aspirasys.com/uploads/technology/1727864297.png" // Replace with dynamic image if available
                                        alt={`${stage.stage_name} Image`}
                                        className="card-img"
                                    />
                                    <h3 className="card-title">
                                        {stage.stage_name} <span>Stage {index + 1}</span>
                                    </h3>
                                    <p className="card-text">
                                        {progress === 0 ? "Yet To Start" : progress === 100 ? "Completed" : "In Progress"}{" "}
                                        <span>{progress}%</span>
                                    </p>
                                    <div className="range">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress}
                                            className="range-input"
                                            style={getRangeStyle(progress)}
                                            readOnly
                                        />
                                    </div>
                                    <Link
                                        to="/admin/aspirants-progress/material-detail"
                                        state={{
                                            stageTitle: stage.stage_name,
                                            techName: techName,
                                            studentId: studentId,
                                            stageId: stage.stage_id,
                                            technologyId: techId,
                                        }}
                                    >
                                        <Button>
                                            View stage{" "}
                                            <span>
                                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/arrow-right.png" alt="arrow" />
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Wrapper>
    );
};

export default TechStage;