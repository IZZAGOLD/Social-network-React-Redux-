import React from 'react';
import Dialogs from './Dialogs'
import { updateNewMessageBody, sendMessageCreateAction } from "../../Redux/dialogs-reducer";
import { connect } from 'react-redux';
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
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
const AuthRedirectComponent = withAuthRedirect(Dialogs)//HOC
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;