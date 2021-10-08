import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 10 },
                { id: 2, message: 'first post', likesCount: 5 },
            ],
            newPostText: 'New post'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Michail'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Victor'},
            ],
            messagesData: [
                { id: 1, message: 'HI' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'YOYO' },
                { id: 4, message: 'Super' },
            ],
            newMessageText: ""
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        debugger;
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
}




export default store;
window.state = store;
