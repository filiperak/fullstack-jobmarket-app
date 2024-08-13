import React, { useState } from "react";
import styles from "../../styles/jobs.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

const Search = () => {
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [range, setRange] = useState<string>("0");
  return (
    <form className={styles.search}>
      <div className={styles.barAndFilter}>
        <div className={styles.bar}>
          <SearchOutlinedIcon />
          <input type="text" name="" id="" placeholder="Search jobs..." />
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
                <option value="city">City</option>
                <option value="city2">City2</option>

            </select>

            </div>
          </div>
          <div className={styles.panelItem}>
            <div className={styles.sort}>
              <p>Sort by:</p>
              <select defaultValue="">
                <option value="" disabled>
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

          <div className={styles.panelItem}>
            <p>Chose employment type:</p>
            <div className={styles.radioContainer}>
            <label htmlFor=""><input type="radio" name="" id="" defaultChecked/>Any</label>
            <label htmlFor=""><input type="radio" name="" id="" />Fulltime</label>
            <label htmlFor=""><input type="radio" name="" id="" />Per Job</label>

            </div>
          </div>
          <div className={styles.panelItem}>
            <p>Price from: ${range}</p>
            <input
              type="range"
              name=""
              id=""
              min={"0"}
              max={"10000"}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
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
