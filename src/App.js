import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import Test from './components/Test/Test.jsx';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginPage";
import React, {Component} from 'react';
import {initializeApp} from "./Redux/app-reducer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader";
import store from './Redux/redux-store';
import {Suspense} from "react";
// import DialogsContainer from './components/Dialogs/DialogsContainer.jsx'
// import ProfileContainer from './components/Profile/ProfileContainer.jsx'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp()

    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/test' render={() => <Test/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;

