const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Michail' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Victor' },
    ],
    messagesData: [
        { id: 1, message: 'HI' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'YOYO' },
        { id: 4, message: 'Super' },
    ],
    newMessageText: ""
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageText;
            return {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, { id: 5, message: body }]
            };
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageText: action.body
            };
        default: return state;
    }
}

export const sendMessageCreateAction = () => {
    return { type: SEND_MESSAGE }
}

export const updateNewMessageBody = (body) => {
    return { type: UPDATE_NEW_MESSAGE_BODY, body: body }
}

export default dialogsReducer;