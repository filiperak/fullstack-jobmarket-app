import React, { useContext, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/dashboard.module.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../context/UserContext";
import { IjobPayload, IJobs } from "../interface/props";
import cityList from "../assets/citys.json";
import { JobContext } from "../context/JobContext";
import { SHOW_INFO } from "../reducer/actions";
import { crateJob } from "../services/jobs/createJob";

const Dashboard = () => {
  const { userState } = useContext(UserContext);
  const { jobsCreated, logged,token } = userState;
  const { jobState, jobDispatch } = useContext(JobContext);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [jobData, setJobData] = useState<IjobPayload>({
    title: "",
    description: "",
    pay: {
      amount: 0,
      typeOfPay: "",
    },
    jobLocation: {
      city: "",
    },
  });

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
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setJobData((prev) => {
      if (name === "title" || name === "description") {
        return { ...prev, [name]: value };
      } else if (name === "city") {
        return { ...prev, jobLocation: { ...prev.jobLocation, city: value } };
      } else if (name === "pay") {
        return { ...prev, pay: { ...prev.pay, typeOfPay: value } };
      } else if (name === "amount") {
        return { ...prev, pay: { ...prev.pay, amount: Number(value) } };
      }

      return prev;
    });
  };

  const createNewJob = async () => {
    try {
      const result = await crateJob(token,jobData)
      if(result && result.error){        
        jobDispatch({ type: SHOW_INFO, payload: result.error.message });
      }

    } catch (error) {}
  };
  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logged || ! token) {
      jobDispatch({ type: SHOW_INFO, payload: "Log in to create jobs" });
      return;
    }
    console.log(jobData);
    createNewJob()
    
  };

  return (
    <div className={globalStyles.views}>
      <section className={styles.container}>
        <div className={styles.appliedJobs}>myJobs</div>

        <div className={styles.myJobs}>
          <header>
            <h3>My Jobs</h3>
            <div
              className={globalStyles.confirmBtn}
              onClick={() => setShowNew((prev) => !prev)}
            >
              <PostAddIcon />
              <p>Add New</p>
            </div>
          </header>
          {showNew && (
            <form className={styles.newJobForm} onSubmit={handleSubmitNew}>
              <div className={styles.inpField}>
                <p>Job Title:</p>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="new awsome job"
                />
              </div>
              <div className={styles.description}>
                <p>Job Description:</p>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                />
              </div>
              <section className={styles.tags}>
                <div>
                  <p>Chose location:</p>
                  <select
                    name="city"
                    value={jobData.jobLocation.city}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Choose city
                    </option>
                    {cityList.map((elem, ind) => (
                      <option key={ind} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Pay amount:</p>
                  <input
                    type="number"
                    placeholder="69"
                    value={Number(jobData.pay.amount)}
                    onChange={handleChange}
                    name="amount"
                  />
                </div>
                <div>
                  <p>Pay type:</p>
                  <select
                    name="pay"
                    onChange={handleChange}
                    value={jobData.pay.typeOfPay}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="hourly">hourly</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                  </select>
                </div>
              </section>
              <footer>
                <button
                  type="button"
                  className={globalStyles.cancelBtn}
                  onClick={() => setShowNew(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={globalStyles.confirmBtn}>
                  Create Job
                </button>
              </footer>
            </form>
          )}
          <section className={styles.myJobsList}>
            {jobsCreated && jobsCreated.length > 0 ? (
              jobsCreated.map((job: IJobs) => (
                <div key={job._id} className={styles.jobListItem}>
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
                              <span className={globalStyles.cancelBtn}>
                                Decline
                              </span>
                              <span className={globalStyles.confirmBtn}>
                                Contact
                              </span>
                              <span className={globalStyles.confirmBtn}>
                                Accept
                              </span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No user has applieed yet</p>
                      )}
                    </ul>
                  )}
                </div>
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
