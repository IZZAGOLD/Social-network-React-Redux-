import React from 'react';
import Dialogs from './Dialogs'
import { updateNewMessageBody, sendMessageCreateAction } from "../../Redux/dialogs-reducer";
import { connect } from 'react-redux';
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (values) => {
            dispatch(sendMessageCreateAction(values));
        }
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect) (Dialogs)