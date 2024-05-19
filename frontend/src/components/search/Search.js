import React from 'react'
import styles from './Search.module.scss'
import { IoMdSearch } from "react-icons/io";

const Search = ({value, onChange}) => {
  return (
    <div className={styles.search}>
        <IoMdSearch size={20} className={styles.icon}/>
        <input type='text' placeholder='Search' 
        value={value} onChange={onChange} />
    </div>
  )
}

export default Search