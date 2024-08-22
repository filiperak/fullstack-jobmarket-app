import React from "react";
import { IJobs } from "../../interface/props";
import styles from "../../styles/jobs.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useNavigate } from "react-router-dom";

interface JobProps {
  data: IJobs;
}

const Job = ({ data }: JobProps) => {
  const Navigate = useNavigate()
  const navigateToJob = (path:string) => {
    Navigate(`/job/${path}`)
  }

  return (
    <div className={styles.job} onClick={() => navigateToJob(data._id)}>
      <section className={styles.jobContent}>
        <h2>{data.title}</h2>
        <div className={styles.jobUsername}>{`posted by:@${data.createdBy.username}`}</div>
        <p>
          {data.description.length < 250
            ? data.description
            : data.description.slice(0, 249) + " ..."}
        </p>
      </section>
      <footer>
        <div>
          <LocationOnOutlinedIcon sx={{ fontSize: "16px" }} />
          <p>{data.jobLocation.city}</p>
        </div>
        <div>
          <AccountBalanceWalletOutlinedIcon sx={{ fontSize: "16px" }} />
          <p>{`${data.pay.amount}$/${data.pay.typeOfPay}`}</p>
        </div>
        <div>
          <AccessTimeOutlinedIcon sx={{ fontSize: "16px" }} />
          <p>
            {new Date(data.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <GroupsOutlinedIcon sx={{ fontSize: "20px" }} />
          <p>{`${data.applicants ? data.applicants.length : " 0"} applied`} </p>
        </div>
      </footer>
    </div>
  );
};

export default Job;
