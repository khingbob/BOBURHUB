import ProfilePic from "../profilePic/ProfilePic";
import css from "./Stories.module.css";
import Fullscreen from "./Fullscreen";
import { useSelector } from "react-redux";
import { mouseUp } from "./Stories";
export default (props) => {
  const userName = useSelector((store) => store.userName);
  const story = props.stories[props.index];
  return (
    story.user != userName && (
      <div
        className={css.storiesPosts}
        onMouseUp={() => {
          mouseUp(props.setFullscreen, props.stories, props.index);
        }}
      >
        <img src={story.storySrc} className={css.storyPreviews} />
        <ProfilePic
          src={story.profileSrc}
          user={story.user}
          className={css.storyProfiles}
        />
      </div>
    )
  );
};
