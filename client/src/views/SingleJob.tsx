import React, { useContext, useEffect } from 'react'
import Loading from '../components/Loading'
import globalStyles from '../styles/app.module.css'
import Error from '../components/Error'
import { useParams } from 'react-router-dom'
import { getJob } from '../services/jobs/getJob'
import { JobContext } from '../context/JobContext'
import { FETCH_JOB_SUCCESS, FETCH_JOBS_REQUEST, FETCH_JOBS_FAILURE } from '../reducer/actions'
import SingleJobComponent from '../components/singleJob/SingleJobComponent'

const SingleJob = () => {
  const {jobId} = useParams()
  const {jobState,jobDispatch} = useContext(JobContext)
  const {loading,error,job} = jobState
  const fetchJob = async() => {
    try {
      jobDispatch({type:FETCH_JOBS_REQUEST});
      const jobData = await getJob(jobId)
      if(jobData.error){
        jobDispatch({type:FETCH_JOBS_FAILURE,payload:jobData.error.message});
        console.log(jobData.error);
        
      }else{
        jobDispatch({type:FETCH_JOB_SUCCESS,payload:jobData.job})
        console.log(jobData);

      }
      
    } catch (error:any) {
      jobDispatch({type:FETCH_JOBS_FAILURE,payload:error.message});
      console.log('test',error.message);
      
    }
  }
  useEffect(() => {
    fetchJob()
  },[])
  if(loading)return <Loading/>
  if(error !== null) return <Error msg={error}/>
  return (
    <div className={`${globalStyles.views} `}>
      {
        job && <SingleJobComponent data={job}/>
      }
    </div>
  )
}


export default SingleJob

