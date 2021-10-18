import load from "../common/load.svg"
import s from "./Loader.module.css"
import React from "react";

const Preloader = (props) => {
return (

    <div className={s.loader}><img  src={load} /> </div>
)
}


export default Preloader;