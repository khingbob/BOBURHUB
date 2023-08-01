import { useDispatch, useSelector } from "react-redux";
import contentCss from "../body/Content.module.css";
import Sidebar from "../body/Sidebar";
import ProfilePic from "../profilePic/ProfilePic";
import css from "./myPage.module.css";
import fullcss from "./Fullscreen.module.css";
import headercss from "../header/Header.module.css";
import * as actions from "../redux/actions";
import { useEffect, useState } from "react";
import { clas, id } from "../functions";
import { db, storage } from "../firebase";
import loading from "../assets/loading.gif";
import Fullscreen from "./Fullscreen";

export default () => {
  const userName = useSelector((store) => store.userName);
  const user = useSelector((store) => store.setUser);
  const profilePic = useSelector((store) => store.profilePic);
  const [posts, setPosts] = useState(null);
  const [postConts, setPostConts] = useState(null);
  const [fullscreen, setFullscreen] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user)
        .onSnapshot((doc) => {
          setPosts(doc.data().posts);
          console.log("reading");
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  async function uploadFiles(e) {
    id(css.plus).style.display = "none";
    id(css.plusLoader).style.display = "block";
    let postId = posts ? posts.length : 0;
    let newPosts = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let postRef = storage.ref("posts/" + user + postId);
      await postRef.put(e.target.files[i]);

      const url = await postRef.getDownloadURL();

      const newPostId = user + postId;
      await db
        .collection("posts")
        .doc(newPostId)
        .set({
          user,
          userName,
          contentSrc: url,
          profilePic,
          postId: newPostId,
          likers: [],
          viewers: [],
          date: new Date(),
        })
        .then(() => {
          newPosts.push(db.collection("posts").doc(newPostId));
        });

      postId++;
    }
    db.collection("users")
      .doc(user)
      .update(
        posts
          ? {
              posts: [...newPosts, ...posts],
            }
          : {
              posts: newPosts,
            }
      );
    id(css.plus).style.display = "block";
    id(css.plusLoader).style.display = "none";
    for (let i = 0; i < clas(css.notPlus).length; i++) {
      clas(css.notPlus)[i].style.opacity = 0;
    }
  }

  useEffect(() => {
    async function fetchPostsData() {
      if (posts && user) {
        const newPostsArray = [];
        const postPromises = [];

        await posts.forEach((post) => {
          const postPromise = db
            .collection("posts")
            .doc(post.id)
            .get()
            .then((postSnapshot) => {
              return postSnapshot.data();
            });

          postPromises.push(postPromise);
        });

        // Wait for all the promises to resolve using Promise.all
        const resolvedPosts = await Promise.all(postPromises);

        // Add the resolved posts to the newPostsArray
        resolvedPosts.forEach((post) => {
          newPostsArray.push(post);
        });
        setPostConts(newPostsArray);
      }
    }
    fetchPostsData();
  }, [posts]);
  useEffect(() => {
    let post = clas(css.post);
    if (post)
      for (let i = 0; i < post.length; i++) {
        post[i].style.borderRadius = 0;
      }
    if (post.length === 1) {
      post[0].style.borderRadius = "10px";
    } else if (post.length === 2) {
      post[0].style.borderRadius = "10px 0 0 10px";
      post[1].style.borderRadius = "0 10px 10px 0";
    } else {
      post[0].style.borderTopLeftRadius = "10px";
      if (post.length >= 3) {
        post[2].style.borderTopRightRadius = "10px";
      }
      post[Math.trunc((post.length - 1) / 3) * 3].style.borderBottomLeftRadius =
        "10px";
      if (post.length % 3 === 0) {
        post[post.length - 1].style.borderBottomRightRadius = "10px";
      }
    }
    for (let i = 0; i < clas(css.notPlus).length; i++) {
      clas(css.notPlus)[i].style.opacity = 1;
    }
  }, [postConts]);
  useEffect(() => {
    id(fullcss.fullscreen) &&
      setTimeout(() => {
        id(fullcss.userData).className = fullcss.second;
        id(fullcss.box).className = fullcss.second;
        id(fullcss.fullscreen).className = fullcss.first;
        if (id(fullcss.left)) {
          id(fullcss.left).classList.add(fullcss.second);
          id(fullcss.left).classList.remove(fullcss.first);
        }
        if (id(fullcss.right)) {
          id(fullcss.right).classList.add(fullcss.second);
          id(fullcss.right).classList.remove(fullcss.first);
        }
        id(fullcss.fullscreen).style.opacity = 1;
        id(fullcss.box).style.opacity = 1;
        id(fullcss.userData).style.opacity = 1;
        id(fullcss.right) && (id(fullcss.right).style.opacity = 1);
        id(fullcss.left) && (id(fullcss.left).style.opacity = 1);
      }, 1);
  }, [fullscreen]);

  return (
    <div id={css.myPage}>
      <div id={css.header}>
        <div id={css.profilePicDiv}>
          <ProfilePic id={css.profilePic} user={user} src={profilePic} />
          <input
            className={css.input}
            type="file"
            accept="image/*"
            onChange={(e) => {
              id(css.profilePic).style.display = "none";
              id(css.profileLoad).style.display = "block";
              let storageRef = storage.ref("profilePics/" + userName);
              storageRef.put(e.target.files[0]).then((snapshot) => {
                storageRef.getDownloadURL().then((url) => {
                  db.collection("users")
                    .doc(user)
                    .update({
                      profilePic: url,
                    })
                    .then(() => {
                      id(css.profilePic).style.display = "block";
                      id(css.profileLoad).style.display = "none";
                      console.log("Profile picture updated successfully.");
                    })
                    .catch((error) => {
                      console.error("Error updating profile picture:", error);
                    });
                });
              });
            }}
          />
          <img id={css.profileLoad} src={loading} />
          <svg viewBox="0 0 24 24" id={css.camera}>
            <path d="M21.75 19.5H2.25a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h4.845l1.282-1.913A.75.75 0 0 1 9 3h6a.75.75 0 0 1 .623.337l1.282 1.913h4.845a.75.75 0 0 1 .75.75v12.75a.75.75 0 0 1-.75.75ZM3 18h18V6.75h-4.5a.75.75 0 0 1-.623-.338L14.595 4.5h-5.19L8.123 6.412a.75.75 0 0 1-.623.338H3V18Z" />
            <path d="M12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
        </div>
        <div id={css.headerRight}>
          <div id={css.nickName}>{userName}</div>
          <div id={css.stats}>
            <div id={css.postsCount}>
              <span>{posts ? posts.length : 0}</span>
              <span>posts</span>
            </div>
            <div id={css.followers}>
              <span>0</span> <span>followers</span>
            </div>
            <div id={css.following}>
              <span>0</span>
              <span>following</span>
            </div>
          </div>
        </div>
      </div>
      <div id={css.posts}>
        <div id={css.addPost} className={css.post}>
          <svg
            id={css.plus}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <input
            type="file"
            accept="image/*"
            multiple
            className={css.input}
            onChange={(e) => {
              uploadFiles(e);
            }}
          />
          <img src={loading} alt="loading" id={css.plusLoader} />
        </div>

        {postConts ? (
          postConts.map((post, index) => (
            <img
              key={"post" + index}
              src={post.contentSrc}
              className={css.post + " " + css.notPlus}
              onClick={() => {
                setFullscreen(
                  <Fullscreen
                    index={index}
                    posts={postConts}
                    profileSrc={profilePic}
                    setFullscreen={setFullscreen}
                    postIds={posts}
                  />
                );
              }}
            />
          ))
        ) : (
          <img src={loading} alt="loading" id={css.loader} />
        )}
      </div>
      {fullscreen}
    </div>
  );
};
