import React from "react";
import styles from "./Styles.module.css"

const array = [1,2,3,4]
const test = () => {
    return  <div className={styles.wrapper}>{array.map(function (arr){
return <div>{arr * 2}</div>
    })}</div>
}

export default test;