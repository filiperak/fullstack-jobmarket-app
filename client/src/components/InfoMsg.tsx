import React, { useContext } from "react";
import styles from "../styles/modal.module.css";
import { JobContext } from "../context/JobContext";
import { HIDE_INFO } from "../reducer/actions";
import globalStyles from '../styles/app.module.css'


const InfoMsg = () => {
  const { jobState, jobDispatch } = useContext(JobContext);
  if (!jobState.infoMsg) return null;
  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <h3>Info</h3>
        <p>{jobState.infoMsg}</p>
        <div className={styles.btnContainer}>
        <button className={globalStyles.confirmBtn} onClick={() => jobDispatch({ type: HIDE_INFO })}>Close</button>
        </div>
      </div>
    </>
  );
};

export default InfoMsg;
