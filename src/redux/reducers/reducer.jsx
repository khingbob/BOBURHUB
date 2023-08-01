import { combineReducers } from "redux";
import notification from "./notification.jsx";
import darkMode from "./darkMode.jsx";
import mobileView from "./mobileView.jsx";
import addStory from "./addStory.jsx";
import setUser from "./setUser.jsx";
import page from "./page.jsx";
import profilePic from "./profilePic.jsx";
import userName from "./userName.jsx";
const reducer = combineReducers({
  notification,
  darkMode,
  mobileView,
  addStory,
  setUser,
  page,
  profilePic,
  userName,
});
export default reducer;
