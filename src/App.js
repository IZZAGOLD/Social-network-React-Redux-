import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import Test from './components/Test/Test.jsx';
import { Route } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer.jsx';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = () => {
  return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => <DialogsContainer/>} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer/>} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/test' render={() => <Test/>} />
        </div>
      </div>
   );
}

export default App;
