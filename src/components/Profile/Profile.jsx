import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import MyPostsContainer from './My posts/MyPostsContainer';
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHook";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         owner={props.owner}
                         saveProfile={props.saveProfile}
                         profile={props.profile}/>
            <ProfileStatusHook status={props.status}
                           updateStatusCreator={props.updateStatusCreator}/>

            <MyPostsContainer />
        </div>
    )
}
export default Profile;