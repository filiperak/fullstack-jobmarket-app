import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/jobs.module.css'
import globalStyles from '../styles/app.module.css'
import Search from '../components/jobsComponents/Search'
import { getAllJobs } from '../services/jobs/getAllJobs'
import { IJobs } from '../interface/props'
import Job from '../components/jobsComponents/Job'
import { JobContext } from '../context/JobContext'
import Loading from '../components/Loading'
import Error from '../components/Error'
import NotFound from '../components/jobsComponents/NotFound'

const Jobs = () => {
  const {jobState,jobDispatch} = useContext(JobContext)
  const {loading,error,jobs} = jobState
  const [skip,setSkip] = useState<number>(0)
  
  return (
    <div className={`${globalStyles.views} ${styles.jobs}`}>
      <Search skip={skip} setSkip={setSkip}/>
      {!loading ? 
      <section className={styles.jobList}>
      {jobs && jobs.length > 0?
      jobs.map((job: IJobs) => (
        <Job key={job._id} data={job}/>
      )):<NotFound/>}
      <div className={styles.loadMoreBtn} onClick={() => setSkip(skip + 10)}>Load More...</div>
    </section>
    :<Loading/>  
    }
    </div>
  )
}

export default Jobs