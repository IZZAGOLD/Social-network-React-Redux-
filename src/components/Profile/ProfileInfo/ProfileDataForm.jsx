import {createField, Input, Textarea} from "../../common/FormsControl/FromsControl";
import {reduxForm} from 'redux-form';
import styles from "../../common/FormsControl/FormsControl.module.css";
import React from "react";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            <div>
                <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional
                    skills</b>: {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About Me</b>: {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                        return <div><b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b></div>})}
            </div>
            {error &&
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm