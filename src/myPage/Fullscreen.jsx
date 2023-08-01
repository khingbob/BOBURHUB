import css from "./Fullscreen.module.css";
import { id } from "../functions";
import Fullscreen from "./Fullscreen";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import ProfilePic from "../profilePic/ProfilePic";
import { useEffect } from "react";
export default (props) => {
  const index = props.index;
  const current = props.posts[index];
  const setFullscreen = props.setFullscreen;
  const posts = props.posts;
  const postIds = props.postIds;
  const contentSrc = current.contentSrc;
  const userName = useSelector((store) => store.userName);
  const user = useSelector((store) => store.setUser);
  const profilePic = useSelector((store) => store.profilePic);
  const postId = current.postId;
  useEffect(() => {
    id(css.fullscreen).onwheel = (event) => {
      event.preventDefault();
    };
    id(css.fullscreen).ontouchmove = (event) => {
      event.preventDefault();
    };
  });
  return (
    <div id={css.fullscreen}>
      <div id={css.userData}>
        <ProfilePic src={profilePic} user={userName} id={css.profile} />
        <div id={css.userName}>{userName}</div>
      </div>
      {props.index != 0 ? (
        <div className={css.svgDiv} id={css.leftSvgDiv}>
          <svg
            id={css.left}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            onClick={() => {
              props.setFullscreen(
                <Fullscreen
                  setFullscreen={setFullscreen}
                  posts={posts}
                  index={index - 1}
                />
              );
            }}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>
      ) : (
        <div className={css.noCursor}></div>
      )}
      <img id={css.box} src={contentSrc} />
      {index < posts.length - 1 ? (
        <div className={css.svgDiv} id={css.rightSvgDiv}>
          <svg
            id={css.right}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            onClick={() => {
              props.setFullscreen(
                <Fullscreen
                  setFullscreen={setFullscreen}
                  posts={posts}
                  index={index + 1}
                />
              );
            }}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      ) : (
        <div className={css.noCursor}></div>
      )}
      <svg
        id={css.x}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        onClick={() => {
          id(css.box).className = css.first;
          id(css.userData).className = css.first;
          id(css.fullscreen).className = css.second;
          id(css.fullscreen).style.opacity = 0;
          id(css.box).style.opacity = 0;
          id(css.userData).style.opacity = 0;
          setTimeout(() => {
            setFullscreen(null);
          }, 400);
        }}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      <svg
        id={css.trash}
        viewBox="0 0 24 24"
        onClick={() => {
          db.collection("posts").doc(postId).delete();
          const docRef = db.collection("users").doc(user);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                const postsArray = data.posts;
                const updatedArray = postsArray.filter(
                  (ref) => ref.id !== postId
                );

                // Update the document with the modified array
                return docRef.update({ posts: updatedArray });
              } else {
                console.log("Document not found!");
              }
            })
            .then(() => {
              console.log(postId, " successfully removed from the array!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
          id(css.box).className = css.first;
          id(css.fullscreen).className = css.second;
          id(css.fullscreen).style.opacity = 0;
          id(css.box).style.opacity = 0;
          setTimeout(() => {
            setFullscreen(null);
          }, 500);
        }}
      >
        <path d="M20.25 4.5h-4.5V3.375A1.875 1.875 0 0 0 13.875 1.5h-3.75A1.875 1.875 0 0 0 8.25 3.375V4.5h-4.5a.75.75 0 0 0 0 1.5h.797l.89 14.293c.067 1.259 1.032 2.207 2.25 2.207h8.625c1.225 0 2.17-.927 2.25-2.203L19.453 6h.797a.75.75 0 1 0 0-1.5Zm-11.223 15H9a.75.75 0 0 1-.75-.723l-.375-10.5a.75.75 0 0 1 1.5-.054l.375 10.5a.75.75 0 0 1-.723.777Zm3.723-.75a.75.75 0 1 1-1.5 0V8.25a.75.75 0 1 1 1.5 0v10.5Zm1.5-14.25h-4.5V3.375A.37.37 0 0 1 10.125 3h3.75a.371.371 0 0 1 .375.375V4.5Zm1.5 14.277a.75.75 0 0 1-.75.723h-.027a.75.75 0 0 1-.723-.777l.375-10.5a.75.75 0 0 1 1.5.054l-.375 10.5Z" />
      </svg>
    </div>
  );
};
