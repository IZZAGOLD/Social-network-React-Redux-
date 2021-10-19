import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './My posts/MyPostsContainer';
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";


const Profile = (props) => {
    debugger
    return (
        <div>

            <ProfileInfo profile={props.profile}/>
            <ProfileStatusHook status={props.status}
                           updateStatusCreator={props.updateStatusCreator}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;