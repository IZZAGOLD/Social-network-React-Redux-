import React from "react";
import styles from "./ProfileStatus.module.css"
class ProfileStatus extends React.Component {


    state = {
        editMode: false,
        status: this.props.status
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    activateEditMode = () => {
        this.setState({editMode: true})
        this.state.editMode = true
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusCreator(this.state.status)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState(
                {
                    status: this.props.status
                }
            )
        }

    }

    render() {
        return (
            <div className={styles.inputStatus}>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input className={styles.input }
                           onChange={this.onStatusChange}
                           /*maxLength={300}*/
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus