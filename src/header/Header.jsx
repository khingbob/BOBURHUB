import css from "./Header.module.css";
import Brand from "./Brand";
import Search from "./Search";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Content from "../body/Content";
import ProfileSettings from "./ProfileSettings";
export default () => {
  return (
    <>
      <ProfileSettings />
      <div id={css.result} className={css.dropdownMenu}></div>
      <header id={css.header}>
        <Brand />
        <Search />
        <div id={css.rightHeader}>
          <Notifications />
          <Profile />
        </div>
      </header>
    </>
  );
};
