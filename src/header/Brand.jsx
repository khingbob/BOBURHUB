import { useDispatch, useSelector } from "react-redux";
import css from "./Header.module.css";
import * as actions from "../redux/actions";
import { redirect } from "../App";
export default () => {
  const dispatch = useDispatch();
  const page = useSelector((store) => store.page);
  return (
    <div
      id={css.brandName}
      onClick={() => {
        redirect(page, "Home", dispatch);
      }}
    >
      BOBUR
      <div id={css.brandHub}>HUB</div>
    </div>
  );
};
