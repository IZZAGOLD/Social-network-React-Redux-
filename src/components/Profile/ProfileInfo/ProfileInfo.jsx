import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import {useState} from "react";
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)
    const profile = props.profile
    if (!profile) {
        return <Preloader/>
    }
    const avatar = 'https://icdn.lenta.ru/images/2021/04/07/19/20210407195955109/square_320_64a1e3121f499e9952053769745d273b.jpg'
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmitProfileData =  (formData) => {
        props.saveProfile(formData).then(() =>{
            setEditMode(false)
        })

    }

    return (
        <div>
            <div>
                <img src={profile.photos.large || avatar} className={s.avatar}/>
            </div>
            <div>
                {props.owner &&
                <input type="file" onChange={onMainPhotoSelected}/>
                }
            </div>
            {editMode ?
                <ProfileDataForm onSubmit={onSubmitProfileData}
                                 initialValues={profile}
                                 profile={profile}/> :
                <ProfileData goToEditMode={() => {setEditMode(true)}}
                             profile={profile}
                             owner={props.owner}/>
            }

        </div>)
}


const ProfileData = ({profile, owner, goToEditMode}) => {
    return (
        <div>
            {owner &&
            <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            }
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About Me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

const Contacts = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;