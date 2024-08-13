import React from "react";
import { ReactComponent as Refresh } from "../assets/Refresh.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Error = ({ msg }: any) => {
  const Navigate = useNavigate();
  return (
    <ErrorWrapper>
      <p>Something went wrong. Please try again</p>
      <p>{msg}</p>
      <Refresh onClick={() => Navigate(0)} />
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--halfway-color);
  width: 100%;
  max-width: 1500px;
  margin: var(--app-margin) auto;
  > svg {
    height: 60px;
    width: 60px;
    margin-top: 50px;
  }
  >p{
    margin-top: 20px;
  }
`;

export default Error;
