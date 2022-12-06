import React from 'react';
import login from "../imgaes/login.svg";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

function Login() {
    const {loginWithRedirect} = useAuth0();
  return (
    <Wrapper>
    <div className='container'>
      <img src={login} alt='github user' />
      <h1>github user</h1>
      <button className='btn' onClick={loginWithRedirect}>
        Log In / Sign Up
      </button>
    </div>
  </Wrapper>
  )
}
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login