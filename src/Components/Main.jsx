import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import PageTransition from './PageTransition'; // Import HOC
import Dashboard from './Dashboard/Dashboard';
import MyLearnings from './MyLearnings/MyLearnings';
import Detail from './MyLearnings/Detail';
import Material from './MyLearnings/Material';
import AspirantsProg from './AspirantsProgress/AspirantsProg';
import ProductiveStudents from './AspirantsProgress/Timesheet/ProductiveStudents';
import TimesheetDetail from './AspirantsProgress/Timesheet/TimesheetDetail';
import AspirantTechnology from './AspirantsProgress/TrainingPlan/AspirantTechnology';
import TechStage from './AspirantsProgress/TrainingPlan/TechStage';
import MaterialDetail from './AspirantsProgress/TrainingPlan/MaterialDetail';
import AspirantCertificates from './AspirantsProgress/AspiraCertificate/AspirantCertificates';
import InterviewDetail from './AspirantsProgress/Interview/InterviewDetail';
import NewRegisteration from './NewRegs/NewRegisteration';
import Events from './Events&Info/Events';
import AspirantsView from './NewRegs/AspirantsView';
import MasterData from './Master-Data/MasterData';
import MasterDataView from './Master-Data/MasterDataView';
import Profile from './Profile/Profile';

const Wrapper = styled.section`
    .dashboard {
        width: 100%;
        min-height: 83vh;
        max-height: 83vh;
        background-color: #f5f7fb;
        overflow-y: scroll;
    }
    .nav {
        background-color: #f4f4f4;
        padding: 1rem;
        display: flex;
        gap: 1rem;
    }
    .nav a {
        text-decoration: none;
        color: #333;
    }
`;

const Main = () => {
    return (
        <Wrapper>
            <div className="dashboard">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PageTransition>
                                <Dashboard />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/my-learnings"
                        element={
                            <PageTransition>
                                <MyLearnings />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/my-learnings/detail/:id"
                        element={
                            <PageTransition>
                                <Detail />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/my-learnings/detail/:id/material"
                        element={
                            <PageTransition>
                                <Material />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress"
                        element={
                            <PageTransition>
                                <AspirantsProg />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/productive-students"
                        element={
                            <PageTransition>
                                <ProductiveStudents />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/timesheet-detail"
                        element={
                            <PageTransition>
                                <TimesheetDetail />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/aspirant-tech"
                        element={
                            <PageTransition>
                                <AspirantTechnology />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/stages"
                        element={
                            <PageTransition>
                                <TechStage />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/material-detail"
                        element={
                            <PageTransition>
                                <MaterialDetail />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/aspirant-certificate"
                        element={
                            <PageTransition>
                                <AspirantCertificates />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/aspirants-progress/interview-detail"
                        element={
                            <PageTransition>
                                <InterviewDetail />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/new-registration"
                        element={
                            <PageTransition>
                                <NewRegisteration />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/new-registration/aspirants-view"
                        element={
                            <PageTransition>
                                <AspirantsView />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/events-info"
                        element={
                            <PageTransition>
                                <Events />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/master-data"
                        element={
                            <PageTransition>
                                <MasterData />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/master-data/view"
                        element={
                            <PageTransition>
                                <MasterDataView />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/admin/profile"
                        element={
                            <PageTransition>
                                <Profile />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <PageTransition>
                                <h1 style={{height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px'}} >404 Not Found</h1>
                            </PageTransition>
                        }
                    />
                </Routes>
            </div>
        </Wrapper>
    );
};

export default Main;
