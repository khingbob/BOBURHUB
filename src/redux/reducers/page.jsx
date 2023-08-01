import * as actions from "../actions.jsx";
export default (state = "Login", action) => {
  switch (action.type) {
    case actions.PAGE:
      return action.payload;
    default:
      return state;
  }
};
