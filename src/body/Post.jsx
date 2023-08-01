import { useEffect, useState } from "react";
import ProfilePic from "../profilePic/ProfilePic";
import css from "./Content.module.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import crown from "../assets/crown.png";
import blackCrown from "../assets/blackCrown.png";

export default (props) => {
  const user = props.user;
  const userName = props.userName;
  const [liked, setLiked] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [crownSrc, setCrownSrc] = useState(crown);
  const darkMode = useSelector((store) => store.darkMode);
  const userId = useSelector((store) => store.setUser);

  const premiumUsers = props.premiumUsers;
  useEffect(() => {
    console.log("reading profilePic");

    const unsubscribe = user
      ? db
          .collection("users")
          .doc(user ?? "err")
          .onSnapshot((doc) => {
            setProfilePic(doc.data().profilePic);
          })
      : () => {};

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (userName) {
      setLiked(props.likers.includes(userId));
    }
  });
  useEffect(() => {
    setTimeout(() => {
      setCrownSrc(darkMode ? crown : blackCrown);
    }, 200);
  }, [darkMode]);
  const khing = premiumUsers?.includes(userName);
  return (
    <div className={`${css.post} ${props.className}`} id={props.postId}>
      <div className={css.postProfile}>
        {khing && <img className={css.crown} src={crownSrc} />}
        <ProfilePic
          src={profilePic}
          className={`${css.postProfilePic} ${css.khing}`}
          user={props.user}
        />
        <div className={css.userName}>{props.userName}</div>
      </div>
      <div className={css.postContentContainer}>
        <img src={props.contentSrc} className={css.postContent} />
      </div>
      <div className={css.postActions}>
        <div className={css.likes}>
          <svg
            className={`${css.likesImage} + ${liked ? css.liked : ""}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            onClick={() => {
              db.collection("posts")
                .doc(props.postId)
                .update({
                  likers: liked
                    ? props.likers.filter((liker) => liker != userId)
                    : [...props.likers, userId],
                });
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {props.likers?.length}
        </div>
        <div className={css.views}>
          <svg viewBox="0 0 24 24" className={css.eye}>
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M18.507 6.618C16.457 5.213 14.264 4.5 11.99 4.5c-2.048 0-4.045.61-5.934 1.804C4.149 7.51 2.28 9.704.75 12c1.238 2.063 2.933 4.183 4.697 5.4 2.024 1.393 4.225 2.1 6.542 2.1 2.297 0 4.493-.706 6.53-2.1 1.792-1.228 3.499-3.346 4.731-5.4-1.237-2.036-2.948-4.151-4.743-5.382ZM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
          </svg>
          {props.viewers?.length}
        </div>
      </div>
    </div>
  );
};
