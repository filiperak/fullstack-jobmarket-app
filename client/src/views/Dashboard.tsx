import React, { useContext, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/dashboard.module.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../context/UserContext";
import { IJobs } from "../interface/props";

const Dashboard = () => {
  const { userState } = useContext(UserContext);
  const { jobsCreated, logged } = userState;
  const [show,setShow] = useState<boolean>(false)

  return (
    <div className={globalStyles.views}>
      <section className={styles.container}>
        <div className={styles.appliedJobs}>myJobs</div>

        <div className={styles.myJobs}>
          <header>
            <h3>My Jobs</h3>
            <div className={styles.addBtn}>
              <PostAddIcon />
              <p>Add New</p>
            </div>
          </header>
          <section className={styles.myJobsList}>
            {jobsCreated.length > 0 ? (
              jobsCreated.map((job: IJobs) => (
                <form key={job._id} className={styles.jobListItem}>
                  <header>
                    <h4>{job.title}</h4>
                    <p>
                      {job.jobLocation.country} / {job.jobLocation.city}
                    </p>
                  </header>
                  <section>
                    <h3>Job description</h3>
                    {job.description}
                  </section>
                  <ul>
                    <h3>Details</h3>
                    <li>
                      Pay: {job.pay.amount} / {job.pay.typeOfPay}
                    </li>
                    <li>
                      Posted:{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                    <li>
                      Applied:{" "}
                      {job.applicants.length > 0 ? job.applicants.length : 0}
                    </li>
                  </ul>
                  <span className={styles.showBtn} onClick={() => setShow(!show)}>
                      {show? 'Show Applicants':'Hide Applicants'}
                  </span>
                </form>
              ))
            ) : (
              <p>You have created 0 jobs</p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
