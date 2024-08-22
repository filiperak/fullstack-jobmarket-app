import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { IJobsAppliedTo } from "../../interface/props";
import { getUserJobs } from "../../services/users/getUserJobs";
import { ReactComponent as Spinner } from "../../assets/Spinner.svg";
import Error from "../../components/Error";
import styles from "../../styles/dashboard.module.css";
import { filterMyJobs } from "../../utility/filterMyJobs";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const AppliedToJobs = () => {
  const [jobsAppliedTo, setJobaAppliedTo] = useState<null | IJobsAppliedTo[]>(null);
  const { userState, userDispatch } = useContext(UserContext);
  const { logged, token, id } = userState;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  

  const getJobs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const result = await getUserJobs(id);
      if (result && result.error) {
        setErrorMsg(result.error);
      } else {
        setJobaAppliedTo(filterMyJobs(result.jobsAppliedTo,id));
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
      setJobaAppliedTo(null);
    }
  }, [logged, id, token]);
  
  
  return (
    <div>
      {errorMsg !== null && <Error />}
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}

      { jobsAppliedTo && jobsAppliedTo.length > 0?
      jobsAppliedTo.map((job, ind) => (
        <div key={job._id} className={styles.jobListItem}>
          <header>
            <h4>{job.title}</h4>
            <p className={styles[job.applicants[0].status]}>
              {job.applicants[0].status}
            </p>
          </header>
          <section>
            <h3>Details</h3>
            <ul>
              <li>
                Location: {job.jobLocation.country}/{job.jobLocation.city}
              </li>
            </ul>
            <ul>
              <li>
                Pay: {job.pay.amount}$/{job.pay.typeOfPay}
              </li>
            </ul>
            <ul>
              <li>Posted by: @{job.createdBy.username}</li>
            </ul>
          </section>
        </div>
      ))
    :(<p className={styles.info}>
      <span><InfoOutlinedIcon/></span> 
      {logged ? "You haven't applied to any jobs yet!" : "Log in to see your jobs"}
      </p>)
    }
    </div>
  );
};

export default AppliedToJobs;
