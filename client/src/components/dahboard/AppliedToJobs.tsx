import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { IJobsAppliedTo } from '../../interface/props';
import { getUserJobs } from '../../services/users/getUserJobs';
import { ReactComponent as Spinner } from "../../assets/Spinner.svg";
import Error from "../../components/Error";
import styles from "../../styles/dashboard.module.css";
import { filterMyJobs } from '../../utility/filterMyJobs';

const AppliedToJobs = () => {

    const [jobsAppliedTo,setJobaAppliedTo] = useState<null | IJobsAppliedTo[]>(null)
    const { userState, userDispatch } = useContext(UserContext);
    const { logged, token, id } = userState;
    const filterdJobs = jobsAppliedTo !== null? filterMyJobs(jobsAppliedTo,id):null
    console.log(filterdJobs);
    
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg,setErrorMsg] = useState <null | string>(null);

    const getJobs = async () => {
      if(!token) return
        setLoading(true)
        try {
          const result = await getUserJobs(id);
          if (result && result.error) {
            setErrorMsg(result.error)
          } else {
            setJobaAppliedTo(result.jobsAppliedTo);
            console.log(result.jobsAppliedTo);
            
          }
          setLoading(false)
        } catch (error: any) {
          setLoading(false)
        }
      };
      useEffect(() => {
        getJobs();
      }, []);
  return (
    <div>
        {errorMsg !== null && <Error/>}
          {loading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
         
            {filterdJobs?.map((job,ind) => (
              <div key={job._id} className={styles.jobListItem}>
              <header>
                <h4>{job.title}</h4>
                <p className={styles[job.applicants[0].status]}>
                  {job.applicants[0].status}
                </p>
              </header>
              </div>
            ))}
         
    </div>
  )
}

export default AppliedToJobs