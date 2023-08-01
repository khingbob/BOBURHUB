import css from "./Header.module.css";
import profilPic from "../assets/profilePic.jpg";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/actions";
import { auth } from "../firebase";
import * as actions from "../redux/actions";
import { redirect } from "../App";
import ProfilePic from "../profilePic/ProfilePic";
export default () => {
  const darkMode = useSelector((store) => store.darkMode);
  const page = useSelector((store) => store.page);
  const user = useSelector((store) => store.setUser);
  const profilePic = useSelector((store) => store.profilePic);
  const userName = useSelector((store) => store.userName);
  const dispatch = useDispatch();
  let themeName;
  let themeIcon;
  if (darkMode) {
    themeName = "Dark";
    themeIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>moon</title>
        <path d="M17.39 15.14A7.33 7.33 0 0 1 11.75 1.6c.23-.11.56-.23.79-.34a8.19 8.19 0 0 0-5.41.45 9 9 0 1 0 7 16.58 8.42 8.42 0 0 0 4.29-3.84 5.3 5.3 0 0 1-1.03.69z" />
      </svg>
    );
  } else {
    themeName = "Light";
    themeIcon = (
      <svg id={css.sun} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path d="M9 4.05c.53 0 1.05.09 1.53.24L9 0 7.47 4.29A4.8 4.8 0 0 1 9 4.05z" />
        <path d="m18 9-4.29-1.53a4.8 4.8 0 0 1 0 3.06z" />
        <path d="M6.76 4.59L2.64 2.63 4.6 6.75a4.9 4.9 0 0 1 2.16-2.16z" />
        <path d="m13.41 6.75 1.96-4.12-4.12 1.96a4.95 4.95 0 0 1 2.16 2.16z" />
        <path d="M9 13.95c-.53 0-1.05-.09-1.53-.24L9 18l1.53-4.29a4.8 4.8 0 0 1-1.53.24z" />
        <path d="m11.25 13.41 4.12 1.96-1.96-4.12a4.9 4.9 0 0 1-2.16 2.16z" />
        <path d="M4.05 9c0-.53.09-1.04.24-1.53L0 9l4.29 1.53A4.8 4.8 0 0 1 4.05 9z" />
        <path d="m4.59 11.25-1.96 4.12 4.12-1.96a4.9 4.9 0 0 1-2.16-2.16z" />
        <circle cx="9" cy="9" r="3.46" />
      </svg>
    );
  }
  return (
    <div id={css.profileSettings} className={css.dropdownMenu}>
      <div
        id={css.accountSettings}
        onMouseEnter={() => {
          document
            .getElementById(css.accountSettings)
            .classList.add(css.secondaryHover);
        }}
        onMouseLeave={() => {
          document
            .getElementById(css.accountSettings)
            .classList.remove(css.secondaryHover);
        }}
      >
        <ProfilePic id={css.profilePicSettings} user={user} src={profilePic} />
        <div id={css.profileData}>
          <div id={css.userName}>{userName}</div>
          <div
            id={css.shareProfile}
            onMouseEnter={() => {
              document
                .getElementById(css.accountSettings)
                .classList.remove(css.secondaryHover);
            }}
            onMouseLeave={() => {
              document
                .getElementById(css.accountSettings)
                .classList.add(css.secondaryHover);
            }}
          >
            Share Profile{" "}
            <svg
              id={css.shareIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              enableBackground="new 0 0 50 50"
            >
              <path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z" />
              <path d="M24 7h2v21h-2z" />
              <path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z" />
            </svg>
          </div>
        </div>
        <div id={css.arrowRightDiv}>
          <svg
            id={css.arrowRight}
            viewBox="0 -4.5 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>arrow_down [#bbb338]</title>{" "}
              <desc>Created with Sketch.</desc> <defs> </defs>{" "}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g
                  id={css.arrow}
                  transform="translate(-220.000000, -6684.000000)"
                >
                  {" "}
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    {" "}
                    <path
                      d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                      id="arrow_down-[#bbb338]"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
      </div>
      <div id={css.otherSettings}>
        <div className={css.otherSetting}>
          <div id={css.settings} className={css.iconSetting}>
            <svg
              id={css.settingsIcon}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
            >
              <title> settings </title>
              <g transform="translate(10 10)">
                <path id="a" d="M1.5-10h-3l-1 6.5h5m0 7h-5l1 6.5h3" />
                <use xlinkHref="#a" transform="rotate(90)" />
                <use xlinkHref="#a" transform="rotate(135)" />
                <use xlinkHref="#a" transform="rotate(45)" />
              </g>
              <path d="M10 2.5a7.5 7.5 0 0 0 0 15 7.5 7.5 0 0 0 0-15v4a3.5 3.5 0 0 1 0 7 3.5 3.5 0 0 1 0-7" />
            </svg>
            Settings
          </div>
        </div>
        <div className={css.otherSetting}>
          <div
            id={css.theme}
            className={css.iconSetting}
            onClick={() => {
              dispatch(changeTheme());
            }}
          >
            {themeIcon}
            Theme: {themeName}
          </div>
        </div>
        <div className={css.otherSetting}>
          <div
            id={css.logOut}
            className={css.iconSetting}
            onClick={() => {
              dispatch(actions.profilePic(null));
              redirect(page, "Login", dispatch);
              auth.signOut().catch((err) => {
                console.log("Sign Out Error");
              });
            }}
          >
            <svg
              id={css.logOutIcon}
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};
