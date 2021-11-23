import React, { useState, useEffect } from 'react'
import './style.css'
import Avatar from '@mui/material/Avatar'
import { db } from '../../firebase';

function Post({ postId, username, caption, imageUrl }) {
    //retirving comments form individual posts
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        }
        //include variable as dependency
    }, [postId])

    //post comment function
    const postComment = (event) => {

    }

    return (
        <div className="post">
            <div className="post__header">
                {/* header -> avatar -> username */}
                <Avatar className="post__avatar"
                    alt={username}
                    src="images/avatar.jpeg" />
                <h3>{username}</h3>
            </div>
            {/*image */}
            <img className="post__image" src={imageUrl} alt="" />
            {/*usernaem -> caption */}
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <form>
                <input className="post__input"
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} >
                </input>
                <button
                    className="post__comment"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post


