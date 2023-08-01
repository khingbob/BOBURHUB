import * as actions from "../actions.jsx";
export default (state = true, action) => {
  switch (action.type) {
    case actions.THEME:
      return !state;
    default:
      return state;
  }
};
