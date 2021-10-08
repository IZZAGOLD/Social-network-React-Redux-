import s from './Post.module.css';

const Post = (props) => {
    return <div>
        <div className={s.item}>
            <img src="https://i.pinimg.com/474x/a3/ab/af/a3abaf8540668420f62dacf79d4a7cad.jpg"></img>
            {props.message}
        </div>
        <div>
            <span>
                <button>{props.likesCount}</button>
            </span>
        </div>
    </div>
}
export default Post;