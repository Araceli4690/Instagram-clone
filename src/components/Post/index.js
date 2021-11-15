import React from 'react'
import './style.css'

function Post() {
    return (
        <div className="post">
            {/* header -> avatar -> username */}
            <h3>Username</h3>
            {/*image */}
            <img className="post__image" src="https://nationaltoday.com/wp-content/uploads/2021/06/International-Corgi-Day-1.jpg" />
            {/*usernaem -> caption */}
            <h4 className="post__text"><strong>Username:</strong> caption</h4>
        </div>
    )
}

export default Post
