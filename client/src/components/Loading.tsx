import React from "react";
import { ReactComponent as Spinner } from "../assets/Spinner.svg";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--halfway-color);
  width: 100%;
  max-width: 1500px;
  margin: var(--app-margin) auto;
  > svg {
    height: 60px;
    width: 60px;
  }
`;
export default Loading;
