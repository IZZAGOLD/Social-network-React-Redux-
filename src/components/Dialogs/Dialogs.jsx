import React from 'react';
import s from './Dialogs.module.css';
import MessageItem from "./MessageItem/MessageItem.jsx";
import DialogItem from "./DialogItem/DialogItem.jsx";
import SendMessageReduxForm from "./SendMessageForm";


const Dialogs = (props) => {
    const state = props.dialogsPage;
    const dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id}/>);
    const messagesElements = state.messagesData.map(m => <MessageItem messageDialog={m.message}/>);

    const onSendMessage = (values) => {
        props.sendMessage(values.sendMessage)
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
                        <SendMessageReduxForm onSubmit={onSendMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;