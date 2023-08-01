import * as actions from "../actions.jsx";
export default (state = true, action) => {
  switch (action.type) {
    case actions.ADDSTORY:
      return !state;
    default:
      return state;
  }
};
