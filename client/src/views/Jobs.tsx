import React, { useEffect, useState } from 'react'
import styles from '../styles/jobs.module.css'
import globalStyles from '../styles/app.module.css'
import Search from '../components/jobsComponents/Search'
import { getAllJobs } from '../services/jobs/getAllJobs'
import { IJobs } from '../interface/props'
const Jobs = () => {

  const [jobs,setJobs] = useState<IJobs[]>([])
  const fetchJobs = async() => {
    try {
      const jobsData = await getAllJobs();
      setJobs(jobsData)
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
        job list
      </section>
    </div>
  )
}

export default Jobs