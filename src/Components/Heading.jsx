import React from 'react';
import styled from 'styled-components';

// Styled component for the heading  
const Wrapper = styled.section`  
.heading {
    width: 100%;

    h1 {  
        color: #252E4A;
        font-size: 20px;  
        font-weight: 500;  
    }  
}
`;

const Heading = ({ title }) => {
    return (
        <Wrapper>
            <div className="heading">
                <h1>{title}</h1>
            </div>
        </Wrapper>
    );
};

export default Heading;