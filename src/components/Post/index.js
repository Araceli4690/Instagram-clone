import React, { useState, useEffect } from 'react'
import './style.css'
import Avatar from '@mui/material/Avatar'
import { db } from '../../firebase';
import firebase from 'firebase/compat';

function Post({ postId, user, username, caption, imageUrl }) {
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
                .orderBy('timestamp', 'desc')
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
        event.preventDefault();
        db.collection('posts').doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
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

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            {user && (
                <form className="post__commentBox">
                    <input className="post__input"
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} >
                    </input>
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}

        </div>
    )
}

export default Post


