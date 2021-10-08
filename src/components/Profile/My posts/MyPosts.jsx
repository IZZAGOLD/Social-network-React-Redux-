import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';


const MyPosts = (props) => {
    const state = props.profilePage;
    const PostsElements = state.postData.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    const newPostElement = React.createRef();

    const onAddPost = () => {
        props.addPost();
    }

    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div>
            <div >
                my post
            </div>
            <div>
                <textarea onChange={onPostChange} ref={newPostElement} value={state.newPostText} />
            </div>
            <div >
                <button onClick={onAddPost}>add post</button>
            </div>
            <div>new post
                {PostsElements}
            </div>
        </div>
    )
}

export default MyPosts;