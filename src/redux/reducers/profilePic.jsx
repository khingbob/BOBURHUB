import * as actions from "../actions.jsx";
import loading from "../../assets/loading.gif";
export default (state = null, action) => {
  switch (action.type) {
    case actions.PROFILEPIC:
      return action.payload;
    default:
      return state;
  }
};
