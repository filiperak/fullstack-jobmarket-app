import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/jobs.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { JobContext } from "../../context/JobContext";
import { getAllJobs } from "../../services/jobs/getAllJobs";
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE } from "../../reducer/actions";
import cityList from '../../assets/citys.json'


const Search = () => {
  const {jobState,jobDispatch} = useContext(JobContext)
  const {loading,error,jobs} = jobState
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [range, setRange] = useState<string>("0");
  const [selectedRangeOption,setSelectedRangeOption] = useState<string>('any')
  const [searchQuery,setSearchQuery] = useState<string>('')  

  const fetchJobs = async() => {
    try {
      jobDispatch({type:FETCH_JOBS_REQUEST});
      const jobsData = await getAllJobs(searchQuery);
      if(jobsData.error){
        jobDispatch({type:FETCH_JOBS_FAILURE,payload:jobsData.error});
        console.log(jobsData.error);
        
      }else{
        jobDispatch({type:FETCH_JOBS_SUCCESS,payload:jobsData.jobs});
        console.log(jobsData.jobs);
      }
    } catch (error: any) {
      jobDispatch({type:FETCH_JOBS_FAILURE,payload:error.message});
    }
  }

  useEffect(() => {
    fetchJobs()
  },[])

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    fetchJobs()
    console.log(searchQuery);   
  }
  useEffect(() => {
    switch (selectedRangeOption) {
      case 'hourly':
        setRange('50');
        break;
      case 'daily':
        setRange('100');
        break;
      case 'monthly':
        setRange('5000');
        break;
      case 'yearly':
        setRange('100000');
        break;
      case 'any':
        setRange('0');
        break;
      default:
        setRange('10000'); 
    }
  }, [selectedRangeOption]);
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <div className={styles.barAndFilter}>
        <div className={styles.bar}>
          <SearchOutlinedIcon />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search jobs..." />
          <button type="submit">Search</button>
        </div>
        <div className={styles.filter} onClick={() => setShowPanel(!showPanel)}>
          <TuneOutlinedIcon />
        </div>
      </div>
      {showPanel ? (
        <section className={styles.panel}>
          <div className={styles.panelItem}>
            <div className={styles.sort}>
            <p>Chose location:</p>
            <select defaultValue=''>
                <option value="" disabled>Select an option</option>
                {cityList.map(city => (
                  <option>{city}</option>
                ))}

            </select>

            </div>
          </div>

          <div className={styles.panelItem}>
            <p>Chose payment type:</p>
            <div className={styles.radioContainer}>
            <label htmlFor="any"><input type="radio" name="radioBtn" id="any" defaultChecked onChange={() => setSelectedRangeOption('any')}/>Any</label>
            <label htmlFor="hourly"><input type="radio" name="radioBtn" id="hourly" onChange={() => setSelectedRangeOption('hourly')}/>Hourly</label>
            <label htmlFor="daily"><input type="radio" name="radioBtn" id="daily" onChange={() => setSelectedRangeOption('daily')}/>Daily</label>
            <label htmlFor="monthly"><input type="radio" name="radioBtn" id="monthly" onChange={() => setSelectedRangeOption('monthly')}/>Monthly</label>
            <label htmlFor="yearly"><input type="radio" name="radioBtn" id="yearly" onChange={() => setSelectedRangeOption('yearly')}/>Yearly</label>
            </div>
            <div className={styles.range}>
            <p>Price from: ${range}</p>
            <input
              type="range"
              name=""
              id=""
              min={"0"}
              max={selectedRangeOption}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>

          </div>
          <div className={styles.panelItem}>
            <div className={styles.sort}>
              <p>Sort by:</p>
              <select defaultValue="">
                <option value="" >
                  Select an option
                </option>
                <optgroup label="Price">
                  <option value="priceAscending">Price Ascending</option>
                  <option value="priceDescending">Price Descending</option>
                </optgroup>
                <optgroup label="Date">
                  <option value="latest">Latest</option>
                  <option value="earliest">Earliest</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div className={styles.panelBtn}>
            <button type="reset">Reset</button>
            <button type="submit">Apply</button>
          </div>
        </section>
      ) : null}
    </form>
  );
};

export default Search;
