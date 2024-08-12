import React, { useEffect, useState } from 'react'
import styles from '../styles/jobs.module.css'
import globalStyles from '../styles/app.module.css'
import Search from '../components/jobsComponents/Search'
import { getAllJobs } from '../services/jobs/getAllJobs'
import { IJobs } from '../interface/props'
import Job from '../components/jobsComponents/Job'

const Jobs = () => {

  const [jobs,setJobs] = useState<IJobs[]>([])
  const fetchJobs = async() => {
    try {
      const jobsData = await getAllJobs();
      setJobs(jobsData.jobs)
      console.log(jobs);
      
    } catch (error: any) {
      console.log(error.messagae);
      
    }
  }
  useEffect(() => {
    fetchJobs()
  },[])
  return (
    <div className={`${globalStyles.views} ${styles.jobs}`}>
      <Search/>
      <section>
        {jobs && jobs.length > 0?
        jobs.map(job => (
          <Job key={job._id} data={job}/>
        )):null}
      </section>
    </div>
  )
}

export default Jobs