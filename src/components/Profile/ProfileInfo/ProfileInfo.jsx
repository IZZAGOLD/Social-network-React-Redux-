// import s from './Profile.module.css';
import hacker from './hacker.PNG';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <div>1</div>
    }

    return (
        <div>
        <div className="content"><img src={hacker} ></img>
            <div>
                <div>
                    <img src={props.profile.photos.large}/></div>
                    <div>avatar+decription</div>
            </div>
        </div>
    </div>)
}
export default ProfileInfo;