import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './My posts/MyPostsContainer';
import ProfileStatus from "./ProfileStatus/ProfileStatus";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <ProfileStatus status={props.status}
                           updateStatusCreator={props.updateStatusCreator}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;