const SEND_MESSAGE:string = 'SEND-MESSAGE';

type DialogType = {
    id:number
    name:string
}
type MessagesType = {
    id:number
    message:string
}
let initialState = {
    dialogsData: [
        {id: 1, name: 'Michail'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Victor'},
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: 'HI'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'YOYO'},
        {id: 4, message: 'Super'},
    ] as Array<MessagesType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData:
                    [...state.messagesData,
                        {id: 5, message: action.newMessageBody}]
            };
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreateAction = (newMessageBody:string): SendMessageCreatorActionType => {
    return {type: SEND_MESSAGE, newMessageBody}
}


export default dialogsReducer;