import React from 'react'
import styles from '../../styles/jobs.module.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const Search = () => {
  return (
    <form className={styles.search}>
      <div className={styles.barAndFilter}>
      <div className={styles.bar}>
        <SearchOutlinedIcon/>
        <input type="text" name="" id=""  placeholder='Search jobs...'/>
        <button type='submit'>Search</button>
      </div>
      <div className={styles.filter}>
        <TuneOutlinedIcon/>
      </div>
      </div>
    </form>
  )
}

export default Search