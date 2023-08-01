import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./redux/actions";
import { id, cssId, clas } from "./functions";
import Header from "./header/Header";
import headerCss from "./header/Header.module.css";
import searchSetup from "./header/searchSetup";
import contentCss from "./body/Content.module.css";
import Sidebar from "./body/Sidebar";
import sidebarCss from "./body/Sidebar.module.css";
import myPageCss from "./myPage/myPage.module.css";
import Content from "./body/Content";
import Stories from "./body/Stories";
import storiescss from "./body/Stories.module.css";
import Author from "./body/Author";
import LoginPage from "./login/LoginPage";
import { auth } from "./firebase";
import MyPage from "./myPage/MyPage";
import { storage, db } from "./firebase";
import ComingSoon from "./ComingSoon/ComingSoon";
export const redirect = (page, toPage, dipsatch) => {
  if (page != toPage) {
    let children = id("root").children;
    for (let i = 0; i < children.length; i++) {
      if (
        toPage != "Login" &&
        page != "Login" &&
        (children[i].id == headerCss.header ||
          children[i].id == headerCss.profileSettings ||
          children[i].id == headerCss.result ||
          children[i].id == sidebarCss.bottombar)
      ) {
        continue;
      }
      children[i].style.opacity = 0;
    }
    setTimeout(() => {
      dipsatch(actions.pageChange(toPage));
      for (let i = 0; i < children.length; i++) {
        children[i].style.opacity = 1;
      }
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }, 200);

    setTimeout(() => {
      if (id(headerCss.profileSettings)) {
        id(headerCss.profileSettings).style.right =
          window.innerWidth -
          id(headerCss.profile).getBoundingClientRect().right +
          "px";
      }
    }, 1000);
  } else if (page == toPage) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }
};

export default () => {
  const user = useSelector((store) => store.setUser);
  const darkMode = useSelector((store) => store.darkMode);
  const mobileView = useSelector((store) => store.mobileView);
  const page = useSelector((store) => store.page);
  const [components, setComponents] = useState(null);

  const dispatch = useDispatch();
  document.documentElement.className = darkMode ? "darkMode" : "lightMode";

  const sizeSetup = () => {
    //Mobile View Setup
    if (window.innerWidth / window.innerHeight < 1.5)
      dispatch(actions.changeMobileView(true));
    else dispatch(actions.changeMobileView(false));

    if (page != "Login") {
      //First Post init
      let firstPost = clas(contentCss.post)[0];
      //Brand and Search Font-Size
      id(headerCss.brandName).style.fontSize =
        cssId(headerCss.header, "height") / 3 + "px";
      id(headerCss.searchInput).style.fontSize =
        cssId(headerCss.header, "height") / 4 + "px";

      //Searchbar Setup
      searchSetup(false, mobileView);

      if (!mobileView) {
        //Brand and Search Left
        if (page == "MyPage") {
          id(sidebarCss.sidebar).className = sidebarCss.fixed;
          id(sidebarCss.sidebar).style.display = "block";

          id(headerCss.brandName).style.left = "1vw";
          id(sidebarCss.sidebar).style.left = "1vw";

          id(sidebarCss.sidebar).style.width =
            id(myPageCss.addPost).getBoundingClientRect().left -
            0.01 * window.innerWidth +
            "px";

          //Header Right
          id(headerCss.rightHeader).style.right = "1vw";
        } else {
          if (page != "Home") {
            id(sidebarCss.sidebar).className = sidebarCss.fixed;
          } else {
            //Sidebar Setup
            if (id(sidebarCss.sidebar))
              id(sidebarCss.sidebar).className = sidebarCss.absolute;
          }
          id(sidebarCss.sidebar).style.display = "flex";
          id(sidebarCss.sidebar).style.width =
            firstPost.getBoundingClientRect().left + "px";
          //brandName
          setTimeout(() => {
            if (id(sidebarCss.sidebar)) {
              id(headerCss.brandName).style.left =
                id(sidebarCss.textBox).getBoundingClientRect().left + "px";
              //Header Right
              if (id(sidebarCss.textBox))
                id(headerCss.rightHeader).style.right =
                  id(sidebarCss.textBox).getBoundingClientRect().left + "px";
            }
          }, 1);
        }

        id(headerCss.searchResult).style.left =
          clas(contentCss.post)[0].getBoundingClientRect().left + "px";
      }

      //ProfileSettings
      id(headerCss.profileSettings).style.right =
        window.innerWidth -
        id(headerCss.profile).getBoundingClientRect().right +
        "px";
    }
  };

  useEffect(() => {
    if (page && page !== "Login") {
      setTimeout(() => {
        sizeSetup();
      }, 10);
      id(headerCss.searchInput).onfocus = () => {
        searchSetup(true, mobileView);
      };
      id(headerCss.searchInput).onblur = () => {
        searchSetup(false, mobileView);
      };
      document.addEventListener("click", (e) => {
        if (
          id(headerCss.profile) &&
          !id(headerCss.profile).contains(e.target) &&
          !id(headerCss.profileSettings).contains(e.target)
        ) {
          id(headerCss.profileSettings).classList.remove(
            headerCss.profileSettingsOpen
          );
        }
      });
      window.onresize = () => {
        sizeSetup();
      };
      window.onscroll = () => {
        if (page === "Home") {
          if (!mobileView) {
            if (id(storiescss.stories).getBoundingClientRect().bottom <= 0) {
              id(sidebarCss.sidebar).className = sidebarCss.fixed;
            } else {
              id(sidebarCss.sidebar).className = sidebarCss.absolute;
            }
          }
        } else {
          if (!mobileView) id(sidebarCss.sidebar).style.position = "fixed";
        }
        for (let i = 1; i < clas(contentCss.post).length; i++) {
          if (
            clas(contentCss.post)[i].getBoundingClientRect().bottom <=
              window.innerHeight &&
            clas(contentCss.post)[i].getBoundingClientRect().top > -100
          ) {
            db.collection("posts")
              .doc(clas(contentCss.post)[i].id)
              .get()
              .then((post) => {
                if (!post.data().viewers.includes(user)) {
                  db.collection("posts")
                    .doc(clas(contentCss.post)[i].id)
                    .update({
                      viewers: [...post.data().viewers, user],
                    });
                }
              });
          }
        }
      };
    }
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (page == "Login") {
          redirect(page, "Home", dispatch);
        }
        dispatch(actions.setUser(authUser.email.split("@")[0]));
        if (user) {
          db.collection("users")
            .doc(user)
            .onSnapshot((doc) => {
              dispatch(actions.profilePic(doc.data().profilePic));
              dispatch(actions.userName(doc.data().userName));
            });
        }
      } else {
        dispatch(actions.setUser(false));
        redirect(page, "Login", dispatch);
      }
    });
    switch (page) {
      case "Home":
        setComponents(<></>);
    }
    return () => {
      unsubscribe();
    };
  }, [user, mobileView, page]);

  switch (page) {
    case "Home":
      return (
        <>
          <Header />
          <Sidebar />
          <Stories />
          <Content />
          <Author />
        </>
      );
    case "MyPage":
      return (
        <>
          <Header />
          <Sidebar />
          <Content className="notHome" />
          <MyPage />
          <Author />
        </>
      );
    case "Messenger":
      return (
        <>
          <Header />
          <Sidebar />
          <Content className="notHome" />
          <ComingSoon />
          <Author className="bottomAuthor" />
        </>
      );
    case "Friends":
      return (
        <>
          <Header />
          <Sidebar />
          <Content className="notHome" />
          <ComingSoon />
          <Author className="bottomAuthor" />
        </>
      );
    default:
      return <LoginPage />;
  }
};
