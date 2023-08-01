import ProfilePic from "../profilePic/ProfilePic";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
export default () => {
  const profilePic = useSelector((store) => store.profilePic);
  const user = useSelector((store) => store.setUser);
  return (
    <div
      id={css.profile}
      className={css.tabs}
      onClick={() => {
        document
          .getElementById(css.profileSettings)
          .classList.toggle(css.profileSettingsOpen);
      }}
    >
      <ProfilePic id={css.profilePic} user={user} src={profilePic} />
      <svg
        id={css.arrowDown}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
};
