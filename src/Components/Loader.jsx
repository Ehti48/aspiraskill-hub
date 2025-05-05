import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    .bg {
        width: 100%;
        min-width: 150px;
        height: 100vh;
        background: linear-gradient(135deg, #f5f7fb, #e0e7ff);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
    }

    .loader {
        width: 80px;
        height: 80px;
        border: 6px solid transparent;
        border-top: 6px solid #3282c4;
        border-radius: 50%;
        animation: spin 1.2s linear infinite;
        margin-bottom: 20px;
    }

    .brand-text {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 1px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const Loader = () => {
  return (
    <Wrapper>
      <div className="bg">
        <div className="loader" />
        <div className="brand-text">AspiraSys</div>
      </div>
    </Wrapper>
  )
}

export default Loader;
