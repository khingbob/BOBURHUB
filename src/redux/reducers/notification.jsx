import * as actions from "../actions.jsx";
export default (state = 0, action) => {
  switch (action.type) {
    case actions.NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};
