import { useState } from "react";
import "./videoCard.css";
import {useEffect} from "react";
let VideoCard = (props) => {
  let [playing, setPlaying] = useState(false);
  let [commentBoxOpen, setCommentBoxOpen] = useState(false);
  {
    console.log(props.data);
  }
  return (
    <div className="video-card">
      
      <p className="video-card-username">{props.name}</p>
      <span className="video-card-music">
        <span className="material-icons">music_note</span>
        <marquee>{props.upper}</marquee>
      </span>
      <div>
      <span
        onClick={(e) => {
          if (commentBoxOpen) {
            setCommentBoxOpen(false);
          } else {
            setCommentBoxOpen(true);
          }
        }}
        className="material-icons-outlined video-card-comment"
      >
        chat
      </span>
      <span className="material-icons-outlined video-card-like">
        favorite_border
      </span>
      {commentBoxOpen ? (
        <div className="video-card-comment-box">
          <div className="actual-comments">
            <div className="post-user-comment">
              <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
              <div>
                <h5>user name</h5>
                <p>This is actual comment</p>
              </div>
            </div>
            <div className="post-user-comment">
              <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
              <div>
                <h5>user name</h5>
                <p>This is actual comment</p>
              </div>
            </div>
          </div>
          <div className="comment-form">
            <input type="text" />
            <button>Post</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <video
        autoPlay
        onClick={(e) => {
          if (playing) {
            e.currentTarget.pause();
            setPlaying(false);
          } else {
            e.currentTarget.play();
            setPlaying(true);
          }
        }}
        loop
        src={props.data}
        className="video-card-video playing"
      ></video>
      </div>
    </div>
  );
};
export default VideoCard;