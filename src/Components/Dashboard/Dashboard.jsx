import React, { useState } from 'react'
import styled from 'styled-components'
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
        justify-content: center;
        align-items: center;
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

const Dashboard = () => {
    const [scrollable, setScrollable] = useState(false);
    const [scrollableProj, setScrollableProj] = useState(false);

    const handleClick = () => {
        setScrollable(true);
    };

    const seeAllProj = () => {
        setScrollableProj(true);
    };

    const messages = [
        { name: "Mohammed Maaz", status: "On Site (Full time)" },
        { name: "Jane Smith", status: "Remote (Part time)" },
        { name: "Alice Johnson", status: "On Site (Contract)" },
        { name: "Bob Williams", status: "Remote (Full time)" },
        { name: "Chris Evans", status: "On Site (Full time)" },
    ];

    const projects = [
        {
            title: "Netflix Clone",
            image: "https://admin.aspiraskillhub.aspirasys.com/images/netflix-n.png",
            techStack: "HTML, CSS, JS",
        },
        {
            title: "Android Mobile App",
            image: "	https://admin.aspiraskillhub.aspirasys.com/images/android.png",
            techStack: "React Native",
        },
        {
            title: "Android Mobile App",
            image: "	https://admin.aspiraskillhub.aspirasys.com/images/android.png",
            techStack: "React Native",
        },
        {
            title: "Netflix Clone",
            image: "https://admin.aspiraskillhub.aspirasys.com/images/netflix-n.png",
            techStack: "HTML, CSS, JS",
        },

    ];

    const data = {
        totalAspirants: 168,
        totalCourses: 10,
        studentsEnrolled: 159,
        gotJob: 22,
    }

    return (
        <Wrapper>
            <div className="container">
                <div className="sub-cont">
                    <div className="box-cont">
                        <div className="box">
                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/usergroup.png" />
                            <div className="count">
                                <p>Total Aspirants</p>
                                <span>{data.totalAspirants}</span>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon" style={{ background: "#88c264" }}>
                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/book.png" />
                            </div>
                            <div className="count">
                                <p>Total Courses</p>
                                <span>{data.totalCourses}</span>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon" style={{ background: "#bb64c2" }}>
                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/profile-add.png" />
                            </div>
                            <div className="count">
                                <p>Students Enrolled</p>
                                <span>{data.studentsEnrolled}</span>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon" style={{ background: "#3282c4" }}>
                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/briefcase.png" />
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
                                overflowY: scrollable ? "scroll" : "hidden",
                                height: scrollable ? "14em" : "13em",
                            }}
                        >
                            {messages.map((message, index) => (
                                <div className="message" key={index}>
                                    <div className="msg-content">
                                        <div className="clock">
                                            <img src="https://admin.aspiraskillhub.aspirasys.com/images/clock.png" />
                                        </div>
                                        <div className="detail">
                                            <p>{message.name}</p>
                                            <span>{message.status}</span>
                                        </div>
                                    </div>
                                    <div className="arrow-bg">
                                        <img src="https://admin.aspiraskillhub.aspirasys.com/images/arrow-right.png" />
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
                        <div className="box box2" style={{ overflowY: scrollableProj ? "scroll" : "hidden", height: scrollableProj ? "14em" : "13em" }}>
                            {projects.map((project, index) => (
                                <div className="projects" key={index}>
                                    <div className="proj-content">
                                        <div className="netflix">
                                            <img src={project.image} />
                                        </div>
                                        <div className="detail">
                                            <p>{project.title}</p>
                                            <span>
                                                <img src="https://admin.aspiraskillhub.aspirasys.com/images/scroll.png" />
                                                {project.techStack}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="edit">
                                        <img src="https://admin.aspiraskillhub.aspirasys.com/images/edit.png" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="upcomingEvents-cont">
                        <div className="header">
                            <Heading title="Upcoming Events" />
                        </div>
                        <div className="box box3">
                            <div className="motivation-comment" id="upcoming-events">
                                <h3 className="no-request">There are no upcoming events</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Dashboard;