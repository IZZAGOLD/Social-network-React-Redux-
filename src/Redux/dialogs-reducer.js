const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        {id: 1, name: 'Michail'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Victor'},
    ],
    messagesData: [
        {id: 1, message: 'HI'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'YOYO'},
        {id: 4, message: 'Super'},
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData:
                    [...state.messagesData,
                        {id: 5, message: action.values}]
            };
        default:
            return state;
    }
}

export const sendMessageCreateAction = (values) => {
    return {type: SEND_MESSAGE, values}
}


export default dialogsReducer;