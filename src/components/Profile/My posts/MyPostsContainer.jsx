import React from 'react';
import { connect } from 'react-redux';
import { updateNewPostTextCreateAction, addPostCreateAction} from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextCreateAction(text));
        },
        addPost: () => {
           dispatch(addPostCreateAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);;