import * as actions from "../actions.jsx";
export default (state = true, action) => {
  switch (action.type) {
    case actions.MOBILEVIEW:
      return action.payload;
    default:
      return state;
  }
};
