import React, { useContext, useState } from "react";
import { IJobs } from "../../interface/props";
import styles from "../../styles/singleJob.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { applyToJob } from "../../services/jobs/applyToJob";
import { UserContext } from "../../context/UserContext";
import Error from "../Error";
import { JobContext } from "../../context/JobContext";
import { SHOW_INFO, USER_APPLIED_TO_JOB } from "../../reducer/actions";
interface IJobProps {
  data: IJobs;
}
const SingleJobComponent = ({ data }: IJobProps) => {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const { userState , userDispatch} = useContext(UserContext);
  const { jobDispatch } = useContext(JobContext);
  const { token, logged } = userState;
  const Navigate = useNavigate();
  const handleApply = async () => {
    if (!logged) {
      jobDispatch({
        type: SHOW_INFO,
        payload: "You must log in to apply to jobs",
      });
      return;
    }
    try {
      const application = await applyToJob(token, data._id);

      console.log(application.message, application);
      if (application.error) {
        jobDispatch({ type: SHOW_INFO, payload: application.error });
      } else {
        userDispatch({type:USER_APPLIED_TO_JOB,payload:application.job})
        jobDispatch({
          type: SHOW_INFO,
          payload: `${application.message}:${application.job.title}`,
        });
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };
  if (errorMsg !== null) return <Error msg={errorMsg} />;
  return (
    <div className={styles.singleJob}>
      <header>
        <h2>{data.title}</h2>
        <h5>
          <LocationOnOutlinedIcon />
          {data.jobLocation.country} / {data.jobLocation.city}
        </h5>
      </header>
      <section>
        <h3>Job description</h3>
        <p>{data.description}</p>
      </section>
      <section>
        <h3>Details</h3>
        <ul>
          <li>
            <AccountBalanceWalletOutlinedIcon />
            Pay: {data.pay.amount} / {data.pay.typeOfPay}
          </li>
          <li>
            <AccessTimeOutlinedIcon />
            Posted:{" "}
            {new Date(data.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </li>
          <li>
            <GroupsOutlinedIcon />
            Applied: {data.applicants.length > 0 ? data.applicants.length : 0}
          </li>
          <li>
            <PersonOutlineOutlinedIcon />
            Posted By: {data.createdBy.username}
          </li>
        </ul>
      </section>
      <footer>
        <button onClick={() => Navigate(-1)}>Go Back</button>
        <button className={styles.messageBtn}>Send Message</button>
        <button onClick={() => handleApply()}>Apply To Job</button>
      </footer>
    </div>
  );
};

export default SingleJobComponent;
