import React, { useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";

function Posts({ username, image, caption, user, postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="https://media-exp1.licdn.com/dms/image/C5603AQGF5Tw7u6Rhng/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=hlW9Kpx4-ubWDRvOUXo-0gPxam0-O99x377-Qfr8tr4"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={image} alt="" />
      <div className="post__caption">
        <p>
          <strong>{username}</strong> {caption}
        </p>
      </div>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            placeholder="Add a comment..."
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
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
  );
}

export default Posts;
