import React from 'react'
import Loading from '../components/Loading'
import globalStyles from '../styles/app.module.css'
import Error from '../components/Error'

const SingleJob = () => {
  const test = true
  if(test) return <Error msg={'kurac'}/>
  return (
    <div>SingleJob</div>
  )
}


export default SingleJob

