import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { IJobsAppliedTo } from '../../interface/props';
import { getUserJobs } from '../../services/users/getUserJobs';
import { ReactComponent as Spinner } from "../../assets/Spinner.svg";
import Error from "../../components/Error";
import styles from "../../styles/dashboard.module.css";

const AppliedToJobs = () => {

    const [jobsAppliedTo,setJobaAppliedTo] = useState<null | IJobsAppliedTo[]>(null)
    const { userState, userDispatch } = useContext(UserContext);
    const { logged, token, id } = userState;
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg,setErrorMsg] = useState <null | string>(null);

    const getJobs = async () => {
        setLoading(true)
        try {
          const result = await getUserJobs(id);
          if (result && result.error) {
            setErrorMsg(result.error)
          } else {
            setJobaAppliedTo(result.jobsAppliedTo);
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
          {<div>
            {jobsAppliedTo?.map((job,ind) => (
              <p key={ind}>{job.title}</p>
            ))}
          </div>}
    </div>
  )
}

export default AppliedToJobs