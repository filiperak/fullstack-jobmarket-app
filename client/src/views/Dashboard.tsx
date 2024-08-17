import React from 'react'
import globalStyles from '../styles/app.module.css'
import styles from '../styles/dashboard.module.css'
import PostAddIcon from '@mui/icons-material/PostAdd';

const Dashboard = () => {
  return (
    <div className={globalStyles.views}>
      <section className={styles.container}>
        <div className={styles.appliedJobs}>
          myJobs
        </div>

        <div className={styles.myJobs}>
          <header>
            <h3>My Jobs</h3>
            <div className={styles.addBtn}>
              <PostAddIcon/>
              <p>Add New</p>
            </div>
          </header>
        </div>
      </section>
    </div>
  )
}

export default Dashboard