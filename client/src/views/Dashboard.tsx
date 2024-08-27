import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../styles/app.module.css";
import styles from "../styles/dashboard.module.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../context/UserContext";
import { IjobPayload, IJobs, IJobsAppliedTo } from "../interface/props";
import cityList from "../assets/citys.json";
import { JobContext } from "../context/JobContext";
import { SHOW_INFO, USER_CREATED_JOB } from "../reducer/actions";
import { crateJob } from "../services/jobs/createJob";
import { sortByDate } from "../utility/sortByDate";
import { ReactComponent as Spinner } from "../assets/Spinner.svg";
import { getUserJobs } from "../services/users/getUserJobs";
import Error from "../components/Error";
import AppliedToJobs from "../components/dahboard/AppliedToJobs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { changeAppliedStatus } from "../services/jobs/changeAppliedStatus";
import PieChartComponent from "../components/dahboard/PieChartComponent";
import { io } from "socket.io-client";
import { API_URL } from "../services/API";

const socket = io(API_URL)

const Dashboard = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [jobsCreated, setJobsCreated] = useState<null | IJobs[]>(null);
  //const [jobsAppliedTo, setJobaAppliedTo] = useState<null | IJobsAppliedTo[]>(null);
  const { logged, token, id,username } = userState;
  const sortedJobs = jobsCreated ? sortByDate(jobsCreated) : null;
  const { jobState, jobDispatch } = useContext(JobContext);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
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

  const getJobs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const result = await getUserJobs(id);
      if (result && result.error) {
        setErrorMsg(result.error);
      } else {
        setJobsCreated(result.jobsCreated);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (logged && token && id) {
      getJobs();
    } else {
      setJobsCreated(null);
    }
  }, [logged, id, token]);

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logged || !token) {
      jobDispatch({ type: SHOW_INFO, payload: "Log in to create jobs" });
      return;
    }
    setLoading(true);
    try {
      const result = await crateJob(token, jobData);
      if (result && result.error) {
        jobDispatch({ type: SHOW_INFO, payload: result.error.message });
      } else {
        setShowNew(false);
      }
      setLoading(false);
    } catch (error: any) {
      jobDispatch({ type: SHOW_INFO, payload: error.message });
      setLoading(false);
    }
    setJobData({
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
    getJobs();
  };
  const handleStatusChange = async(userId: string, jobId: string,action:string,jobTitle:string) => {

    setJobsCreated((prev) =>
      prev
        ? prev.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  applicants: job.applicants.map((applicant) =>
                    applicant.applicant._id === userId
                      ? { ...applicant, status: action }
                      : applicant
                  ),
                }
              : job
          )
        : null
    );
    try {
      const result = await changeAppliedStatus(token,jobId,userId,action)
      if(result && result.error){
        jobDispatch({ type: SHOW_INFO, payload: result.error.message });
      }else{
        socket.emit('sendNotification',{
          senderId:id,
          receiverId:userId,
          content: `@${username} has ${action} yor application for the job: "${jobTitle}"`
        })
      }
    } catch (error:any) {
      jobDispatch({ type: SHOW_INFO, payload: error.message });
    }
  };

  return (
    <div className={globalStyles.views}>
      <section className={styles.container}>
        <div className={styles.appliedJobs}>
          <header className={styles.header}>
            <h3>Applied to jobs</h3>
          </header>
          <div className={styles.appliedJobsList}>
          <AppliedToJobs />
          </div>
        </div>
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
                    <hr />
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
                    type="text"
                    pattern="[0-9]*"
                    placeholder="69"
                    inputMode="numeric"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.replace(/[^0-9]/g, "");
                    }}
                    value={String(jobData.pay.amount)}
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
                    <hr />
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
                  onClick={() => {
                    setShowNew(false);
                    setJobData({
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
                  }}
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
            {loading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
            {errorMsg !== null && <Error />}
            {sortedJobs && sortedJobs.length > 0 ? (
              sortedJobs.map((job: IJobs) => (
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
                      Pay: {job.pay.amount}$/{job.pay.typeOfPay}
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
                        job.applicants.map((user, ind) => (
                          <li key={ind}>
                            <div className={styles.applicantData}>
                              <p className={styles[user.status]}>
                                Status: {user.status}
                              </p>
                              <p>
                                <PersonOutlineOutlinedIcon />: @
                                {user.applicant.username}
                              </p>
                              <p>
                                <EmailOutlinedIcon />: {user.applicant.email}
                              </p>
                            </div>
                            <div className={styles.applicantBtn}>
                              <span
                                className={globalStyles.cancelBtn}
                                onClick={() =>
                                  handleStatusChange(user.applicant._id, job._id,"declined",job.title)
                                }
                              >
                                Decline
                              </span>
                              <span className={globalStyles.confirmBtn}>
                                Contact
                              </span>
                              <span
                                className={globalStyles.confirmBtn}
                                onClick={() =>
                                  handleStatusChange(user.applicant._id, job._id,"accepted",job.title)
                                }
                              >
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
              <p className={styles.info}>
                {" "}
                <span>
                  <InfoOutlinedIcon />
                </span>
                {logged
                  ? "You haven't created any jobs yet!"
                  : "Log in to see your jobs"}
              </p>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
