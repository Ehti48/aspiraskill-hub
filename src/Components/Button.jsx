import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 8px 24px;
    background: #3282c4;
    color: #fff;
    font-weight: 400;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    &:hover {
        background: #3282c4db /* Optional hover effect */
    }
`;

const Button = ({ onClick, children }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
