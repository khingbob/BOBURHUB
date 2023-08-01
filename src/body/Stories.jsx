import css from "./Stories.module.css";
import fullcss from "./Fullscreen.module.css";
import story from "../assets/story.jpg";
import profilePic from "../assets/profilePic.jpg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { id } from "../functions";
import { useEffect, useState } from "react";
import ProfilePic from "../profilePic/ProfilePic";
import { db, storage } from "../firebase";
import Story from "./Story";
import Fullscreen from "./Fullscreen";
import loading from "../assets/loading.gif";
let isDragged = false;

export const mouseUp = (setFullscreen, stories, index) => {
  !isDragged &&
    setFullscreen(
      <Fullscreen
        setFullscreen={setFullscreen}
        stories={stories}
        index={index}
      />
    );
};
export default () => {
  const [storySrc, setStorySrc] = useState(null);
  const [stories, setStories] = useState(null);
  const [fullscreen, setFullscreen] = useState(null);
  const profilePic = useSelector((store) => store.profilePic);
  const user = useSelector((store) => store.setUser);
  const userName = useSelector((store) => store.userName);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user)
        .onSnapshot((doc) => {
          console.log("reading stories");
          setStorySrc(doc.data().stories);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      let newStories = snapshot.docs
        .map((doc) => ({
          storySrc: doc.data().stories,
          profileSrc: doc.data().profilePic,
          user: doc.id,
          userName: doc.data().userName,
        }))
        .filter((doc) => doc.storySrc != null && doc.user !== user)
        .sort((a, b) => b.date - a.date);
      storySrc &&
        newStories.unshift({
          storySrc,
          profileSrc: profilePic,
          user: user,
          userName: userName,
        });
      setStories(newStories);
    });

    //dragscroll

    const storiesEl = id(css.stories);
    let isDragging = false;
    let startX;
    let deltaX;
    let pressed;

    storiesEl.onmousedown = (e) => {
      isDragging = true;
      startX = e.clientX;
      pressed = e.target;
    };
    document.onmouseup = (e) => {
      isDragging = false;
      isDragged = false;
      pressed = null;
    };
    document.onmousemove = (e) => {
      if (isDragging) {
        isDragged = true;
        deltaX = e.clientX - startX;
        storiesEl.scrollLeft -= deltaX;
        startX = e.clientX;
      }
    };
    return () => {
      unsubscribe();
    };
  }, [storySrc]);

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
    <>
      <div id={css.stories}>
        <div className={css.storiesPosts}>
          {storySrc ? (
            <img
              src={storySrc}
              className={`${css.storyPreviews} ${css.bright}`}
              onClick={() => {
                setFullscreen(
                  <Fullscreen
                    setFullscreen={setFullscreen}
                    stories={stories}
                    index={0}
                  />
                );
              }}
            />
          ) : (
            <div id={css.addStoryContainer} className={css.storyPreviews}>
              <svg
                id={css.addStory}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <img id={css.loading} src={loading} />
              <input
                type="file"
                accept="image/*"
                id={css.storyInp}
                onChange={(e) => {
                  id(css.addStory).style.display = "none";
                  id(css.loading).style.display = "block";
                  let storageRef = storage.ref("stories/" + user);
                  storageRef.put(e.target.files[0]).then((snapshot) => {
                    storageRef.getDownloadURL().then((url) => {
                      db.collection("users")
                        .doc(user)
                        .update({
                          stories: url,
                          date: new Date(),
                        })
                        .then(() => {
                          console.log("Story updated successfully.");
                        })
                        .catch((error) => {
                          console.error("Error updating story:", error);
                        });
                    });
                  });
                }}
              />
            </div>
          )}
          <ProfilePic
            className={css.storyProfiles}
            user={user}
            src={profilePic}
          />
        </div>
        {stories?.map(
          (story, index) =>
            story.user !== user && (
              <Story
                key={"story" + index}
                index={index}
                stories={stories}
                setFullscreen={setFullscreen}
              />
            )
        )}
      </div>
      {fullscreen}
    </>
  );
};
