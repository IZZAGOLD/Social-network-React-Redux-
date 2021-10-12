import React from 'react';
import Dialogs from './Dialogs'
import { updateNewMessageBody, sendMessageCreateAction } from "../../Redux/dialogs-reducer";
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (body) => {
           dispatch(updateNewMessageBody(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreateAction());
        }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;