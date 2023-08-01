export const NOTIFICATION = "Notification";
export const THEME = "Theme";
export const MOBILEVIEW = "Mobile View";
export const ADDSTORY = "Add Story Button";
export const SETUSER = "User Set";
export const USERNAME = "Username Set";
export const PAGE = "Page change";
export const PROFILEPIC = "Profile Pic Change";
export const changeTheme = () => ({
  type: THEME,
});
export const checkNotification = (payload) => ({
  type: NOTIFICATION,
  payload,
});
export const changeMobileView = (payload) => ({
  type: MOBILEVIEW,
  payload,
});
export const changeStory = (payload) => ({
  type: ADDSTORY,
  payload,
});
export const setUser = (payload) => ({
  type: SETUSER,
  payload,
});
export const userName = (payload) => ({
  type: USERNAME,
  payload,
});
export const pageChange = (payload) => ({
  type: PAGE,
  payload,
});
export const profilePic = (payload) => ({
  type: PROFILEPIC,
  payload,
});
