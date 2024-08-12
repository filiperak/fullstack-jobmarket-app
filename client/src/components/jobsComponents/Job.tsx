import React from 'react'
import { IJobs } from '../../interface/props'
import styles from '../../styles/jobs.module.css'

interface JobProps {
    data: IJobs;
  }

const Job = ({data}:JobProps) => {
  return (
    <div className={styles.job}>
        <h1>
        {data.title}
        </h1>
        <p>{data.description}</p>
        <p>Created by: {data.createdBy.username} ({data.createdBy.email})</p>
        <p>Posted on: {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
  )
}

export default Job