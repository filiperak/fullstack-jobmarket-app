import React, { useContext, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/dashboard.module.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../context/UserContext";
import { IJobs } from "../interface/props";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  const { userState } = useContext(UserContext);
  const { jobsCreated, logged } = userState;

  const [selected, setSelected] = useState<string[]>([]);
  const handleSelected = (currentId: string) => {
    const copySelected = [...selected];
    const findIndexOfSelected = copySelected.indexOf(currentId);
    if (findIndexOfSelected === -1) {
      copySelected.push(currentId);
    } else {
      copySelected.splice(findIndexOfSelected, 1);
    }
    setSelected(copySelected);
  };

  return (
    <div className={globalStyles.views}>
      <section className={styles.container}>
        <div className={styles.appliedJobs}>myJobs</div>

        <div className={styles.myJobs}>
          <header>
            <h3>My Jobs</h3>
            <div className={globalStyles.confirmBtn}>
              <PostAddIcon />
              <p >Add New</p>
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
                  <span
                    className={`${styles.showBtn} ${globalStyles.confirmBtn}`}
                    onClick={() => handleSelected(job._id)}
                  >
                    {selected.indexOf(job._id) !== -1
                      ? "Hide Applicants"
                      : "Show Applicants"}
                  </span>
                  {selected.indexOf(job._id) !== -1 && (
                    <ul className={styles.applicantList}>
                      <p>Applicants:</p>
                      {job.applicants.length > 0 ? (
                        job.applicants.map((user) => (
                          <li>
                            <p>
                              @{user.username} / {user.email}
                            </p>
                            <div className={styles.applicantBtn}>
                              <span className={globalStyles.cancelBtn}>Decline</span>
                              <span className={globalStyles.confirmBtn}>Contact</span>
                              <span className={globalStyles.confirmBtn}>Accept</span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No user has applieed yet</p>
                      )}
                    </ul>
                  )}
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
