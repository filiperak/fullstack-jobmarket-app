import React from "react";
import globalStyles from "../styles/app.module.css";
import styled from "styled-components";
const Info = () => {
  return (
    <div className={globalStyles.views}>
      <InfoWrapper>
        <h2>Info</h2>
        <p>
          Gig Works&reg; is an app that provides users with the ability to
          create and apply for small, quick jobs (gig jobs). Users first need to
          create an account to access all the functionalities of the app. Once
          registered, users can both apply for and create jobs. When someone
          applies for a job, the job creator has the option to accept or decline
          applicants. Users receive real-time notifications about the status of
          their applications. The app also implements real-time messaging,
          allowing users to directly contact job posters.
        </p>
        <p>
          This app was created as a portfolio project. Feel free to check out
          all my other projects on{" "}
          <a href="https://github.com/filiperak" target="_blank">GitHub</a>.
        </p>
      </InfoWrapper>
    </div>
  );
};

const InfoWrapper = styled.div`
  margin: var(--app-margin);
  border-radius: var(--app-border-radius);
  height: 98%;
  background-color: var(--background-color);
  padding: var(--app-padding);
  text-align: center;
  > h2 {
    margin: 20px 0;
  }
  p {
    text-align: left;
    margin-top: 10px;
    padding: 0 15%;
  }
`;

export default Info;
