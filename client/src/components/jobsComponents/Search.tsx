import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/jobs.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { JobContext } from "../../context/JobContext";
import { getAllJobs } from "../../services/jobs/getAllJobs";
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILURE, FETCH_JOBS_REPLACE_SUCCESS, EMPTY_JOBS } from "../../reducer/actions";
import cityList from '../../assets/citys.json'
import globalStyles from '../../styles/app.module.css'
import { IJobsAction } from "../../interface/props";

interface SearchProps {
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;

}
const Search = ({skip,setSkip}:SearchProps) => {
  const {jobState,jobDispatch} = useContext(JobContext)
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [payRange, setPayRange] = useState<string>("0");
  const [selectedRangeOption,setSelectedRangeOption] = useState<string>('any')
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    city: '',
    range: '0',
    sort: '',
  });
  
  
  const fetchJobs = async(typeAction:IJobsAction['type']) => {    
    try {
      jobDispatch({type:FETCH_JOBS_REQUEST});
      const jobsData = await getAllJobs(searchParams.searchQuery,searchParams.city,searchParams.range,searchParams.sort,skip);
      if(jobsData.error){
        jobDispatch({type:FETCH_JOBS_FAILURE,payload:jobsData.error});
        
      }else{
        jobDispatch({type:typeAction,payload:jobsData.jobs});
        console.log(jobsData.jobs);
      }
    } catch (error: any) {
      jobDispatch({type:FETCH_JOBS_FAILURE,payload:error.message});
    }
  }

  const initialRender = useRef(true);
  useEffect(() => {
    fetchJobs(FETCH_JOBS_SUCCESS);
  }, [skip]);


  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    setSkip(0)
    fetchJobs(FETCH_JOBS_REPLACE_SUCCESS)    
  }
  useEffect(() => {
    switch (selectedRangeOption) {
      case 'hourly':
        setPayRange('50');
        break;
      case 'daily':
        setPayRange('100');
        break;
      case 'monthly':
        setPayRange('5000');
        break;
      case 'yearly':
        setPayRange('100000');
        break;
      case 'any':
        setPayRange('100');
        break;
      default:
        setPayRange('10000'); 
    }
  }, [selectedRangeOption]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams(prev => ({ ...prev, range: value }));
  };
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <div className={styles.barAndFilter}>
        <div className={styles.bar}>
          <SearchOutlinedIcon />
          <input type="text" name='searchQuery' value={searchParams.searchQuery} onChange={handleChange} placeholder="Search jobs..." />
          <button type="submit" className={globalStyles.confirmBtn}>Search</button>
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
            <select name="city" value={searchParams.city} onChange={handleChange}>
                <option value="" >Select an option</option>
                {cityList.map((city,ind) => (
                  <option key={ind} value={city}>{city}</option>
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
            <p>Pay from: ${searchParams.range}</p>
            <input
              type="range"
              name=""
              id=""
              min={"0"}
              max={payRange}
              value={searchParams.range}
              onChange={handleRangeChange}
            />
          </div>

          </div>
          <div className={styles.panelItem}>
            <div className={styles.sort}>
              <p>Sort by:</p>
              <select name="sort" value={searchParams.sort} onChange={handleChange}>
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
            <button type="reset" onClick={() => setSearchParams({
               searchQuery: '',
               city: '',
               range: '0',
               sort: '',
            })}>Reset</button>
            <button type="submit">Apply</button>
          </div>
        </section>
      ) : null}
    </form>
  );
};

export default Search;
