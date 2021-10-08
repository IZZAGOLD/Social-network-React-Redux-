import React from 'react';
import Dialogs from './Dialogs'
import { updateNewMessageBody, sendMessageCreateAction } from "../../Redux/dialogs-reducer";
import { connect } from 'react-redux';
// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState().dialogsPage

//                 let sendMessage = () => {
//                     store.dispatch(sendMessageCreateAction());
//                 }

//                 let onMessageChange = (body) => {
//                     store.dispatch(updateNewMessageBody(body));
//                 }

//                 return <Dialogs
//                     updateNewPostText={onMessageChange}//callback
//                     sendMessage={sendMessage}//callback
//                     newMessageText={state.newMessageText}//textarea
//                     messagesData={state.messagesData}//array of messages
//                     dialogsData={state.dialogsData} />//aray of dialogs
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
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