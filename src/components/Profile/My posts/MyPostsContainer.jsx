import React from 'react';
import {connect} from 'react-redux';
import {addPostCreateAction} from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (values) => {
            dispatch(addPostCreateAction(values));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
