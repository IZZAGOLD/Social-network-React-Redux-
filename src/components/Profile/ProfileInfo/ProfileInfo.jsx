// import s from './Profile.module.css';
import hacker from './hacker.PNG';
import Preloader from "../../common/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
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