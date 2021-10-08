import React from 'react';
import s from './Dialogs.module.css';
import MessageItem from "./MessageItem/MessageItem.jsx";
import DialogItem from "./DialogItem/DialogItem.jsx";

const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogsData.map( d=> <DialogItem name={d.name} id={d.id} />);
    let messagesElements = state.messagesData.map(m => <MessageItem messageDialog={m.message} />);
    let newMessageText = state.newMessageText;

    let onSendMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewPostText(body);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea value={newMessageText}
                            onChange={onMessageChange}
                            placeholder='Enter your message'></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;