import { useEffect, useState } from "react";
import css from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { redirect } from "../App";
export default () => {
  const [pages, setPages] = useState([]);
  const mobileView = useSelector((state) => state.mobileView);
  const page = useSelector((store) => store.page);
  const dispatch = useDispatch();
  let navBar = css.sidebar;
  useEffect(() => {
    let iconClass = mobileView ? css.bottombarIcons : css.sidebarIcons;
    let divsClass = mobileView ? css.bottombarIconDivs : css.iconText;
    let pagesObj = (
      <>
        {/*home*/}
        <div
          className={divsClass}
          key="home"
          onClick={() => {
            redirect(page, "Home", dispatch);
          }}
        >
          <svg
            className={iconClass + " " + (page == "Home" ? css.filled : "")}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d="M1.714 12 12 1.714 22.286 12" />
            <path d="M4 9.714v8A2.286 2.286 0 0 0 6.286 20h11.428A2.286 2.286 0 0 0 20 17.714v-8" />
          </svg>
          <div>{mobileView ? null : "Home"}</div>
        </div>

        <div
          className={divsClass}
          key="messenger"
          onClick={() => {
            redirect(page, "Messenger", dispatch);
          }}
        >
          <svg
            className={
              iconClass + " " + (page == "Messenger" ? css.filled : "")
            }
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M22 2 11 13" />
            <path d="m22 2-7 20-4-9-9-4 20-7z" />
          </svg>
          <div>{mobileView ? null : "Messenger"}</div>
        </div>

        <div
          className={divsClass}
          key="friends"
          onClick={() => {
            redirect(page, "Friends", dispatch);
          }}
        >
          <svg
            className={iconClass + " " + (page == "Friends" ? css.filled : "")}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <path d="M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <div>{mobileView ? null : "Friends"}</div>
        </div>
        <div
          className={divsClass}
          key="myPage"
          onClick={() => {
            redirect(page, "MyPage", dispatch);
          }}
        >
          <svg
            className={iconClass + " " + (page == "MyPage" ? css.filled : "")}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
          </svg>
          <div>{mobileView ? null : "My Page"}</div>
        </div>
      </>
    );
    setPages(pagesObj);
  }, [page, mobileView]);
  if (mobileView) {
    return <nav id={css.bottombar}>{pages}</nav>;
  } else {
    return (
      <aside id={css.sidebar} className={css.absolute}>
        <div id={css.textBox}>{pages}</div>
      </aside>
    );
  }
};
