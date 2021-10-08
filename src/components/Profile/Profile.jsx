import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './My posts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostsContainer />
        </div>
    )
}
export default Profile;