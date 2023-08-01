import * as actions from "../actions.jsx";
export default (state = false, action) => {
  switch (action.type) {
    case actions.USERNAME:
      return action.payload;
    default:
      return state;
  }
};
