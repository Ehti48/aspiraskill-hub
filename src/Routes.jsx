import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import MyLearnings from './Components/MyLearnings/MyLearnings';
import Detail from './Components/MyLearnings/Detail';
import Material from './Components/MyLearnings/Material';
import AspirantsProg from './Components/AspirantsProgress/AspirantsProg';
import ProductiveStudents from './Components/AspirantsProgress/Timesheet/ProductiveStudents';
import TimesheetDetail from './Components/AspirantsProgress/Timesheet/TimesheetDetail';
import AspirantTechnology from './Components/AspirantsProgress/TrainingPlan/AspirantTechnology';
import TechStage from './Components/AspirantsProgress/TrainingPlan/TechStage';
import MaterialDetail from './Components/AspirantsProgress/TrainingPlan/MaterialDetail';
import AspirantCertificates from './Components/AspirantsProgress/AspiraCertificate/AspirantCertificates';
import InterviewDetail from './Components/AspirantsProgress/Interview/InterviewDetail';
import NewRegisteration from './Components/NewRegs/NewRegisteration';
import Events from './Components/Events&Info/Events';
import AspirantsView from './Components/NewRegs/AspirantsView';
import MasterData from './Components/Master-Data/MasterData';
import MasterDataView from './Components/Master-Data/MasterDataView';
import Profile from './Components/Profile/Profile';

export const routes = [
    {
        path: '/',
        element: <Dashboard />,
    },
    {
        path: '/admin/my-learnings',
        element: <MyLearnings />,
    },
    {
        path: '/admin/my-learnings/detail/:id',
        element: <Detail />,
    },
    {
        path: '/admin/my-learnings/detail/:id/material',
        element: <Material />,
    },
    {
        path: '/admin/aspirants-progress',
        element: <AspirantsProg />,
    },
    {
        path: '/admin/aspirants-progress/productive-students',
        element: <ProductiveStudents />,
    },
    {
        path: '/admin/aspirants-progress/timesheet-detail',
        element: <TimesheetDetail />,
    },
    {
        path: '/admin/aspirants-progress/aspirant-tech',
        element: <AspirantTechnology />,
    },
    {
        path: '/admin/aspirants-progress/stages',
        element: <TechStage />,
    },
    {
        path: '/admin/aspirants-progress/material-detail',
        element: <MaterialDetail />,
    },
    {
        path: '/admin/aspirants-progress/aspirant-certificate',
        element: <AspirantCertificates />,
    },
    {
        path: '/admin/aspirants-progress/interview-detail',
        element: <InterviewDetail />,
    },
    {
        path: '/admin/new-registration',
        element: <NewRegisteration />,
    },
    {
        path: '/admin/new-registration/aspirants-view',
        element: <AspirantsView />,
    },
    {
        path: '/admin/events-info',
        element: <Events />,
    },
    {
        path: '/admin/master-data',
        element: <MasterData />,
    },
    {
        path: '/admin/master-data/view',
        element: <MasterDataView />,
    },
    {
        path: '/admin/profile',
        element: <Profile />,
    },
    {
        path: '*',
        element: <h1 style={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px' }}>Coming Soon!</h1>,
    },
];

export default routes;