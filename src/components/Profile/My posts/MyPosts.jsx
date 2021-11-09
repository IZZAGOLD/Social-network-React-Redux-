import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import AddPostReduxForm from "./Post/AddPostForm";

const MyPosts = (props) => {
    const PostsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const onAddPost = (values) => {
        props.addPost(values.addPost);
    }

    return (
        <div>
            <div>
                my post
            </div>
            <div>
                <AddPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div>new post
                {PostsElements}
            </div>
        </div>
    )
}

export default MyPosts;