import store from './Redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import MainApp from "./App";

ReactDOM.render(<MainApp/>, document.getElementById('root'));

