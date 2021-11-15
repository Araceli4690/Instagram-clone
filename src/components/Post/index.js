import React from 'react'
import './style.css'
import Avatar from '@mui/material/Avatar'

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                {/* header -> avatar -> username */}
                <Avatar className="post__avatar"
                    alt="Username"
                    src="images/avatar.jpeg" />
                <h3>Username</h3>
            </div>
            {/*image */}
            <img className="post__image" src="https://thumbs.dreamstime.com/b/cute-portrait-dog-pembroke-welsh-corgi-wear-cap-birthday-stretches-its-muzzle-to-delicious-cake-owner-hand-bright-pink-172610682.jpg" alt="" />
            {/*usernaem -> caption */}
            <h4 className="post__text"><strong>Username:</strong> caption</h4>
        </div>
    )
}

export default Post
