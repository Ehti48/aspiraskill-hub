import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../Routes';

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
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        </Wrapper>
    );
};

export default Main;