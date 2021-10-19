import React, {useEffect, useState} from "react";
import styles from "./ProfileStatus.module.css"

const ProfileStatusHook = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusCreator(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div className={styles.inputStatus}>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{status || 'Status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input className={styles.input}
                       onChange={onStatusChange}
                       value={status}
                       onBlur={deactivateEditMode}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusHook