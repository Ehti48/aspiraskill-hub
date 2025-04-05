import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    .bg {
        width: 100%;
        min-width: 150px;
        height: 100vh;
        background-color: #f5f7fb;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
    }

    .loader {
        width: 100px;
        height: 100px;
        background-color: #ce4a27;
        border-radius: 10px;
        animation: spin 2.5s infinite;
    }

    @keyframes spin {
        0%, 100% {
            background-color: #6aaa43;
            transform: rotate(280deg);
            border-radius: 50%;
        }
        50% {
            background-color: #3282c4;
            transform: rotate(0deg);
            border-radius: 10px;
        }
    }`

const Loader = () => {
  return (
    <Wrapper>
      <div className="bg">
        <div className="loader">
        </div>
      </div>
    </Wrapper>
  )
}

export default Loader;
