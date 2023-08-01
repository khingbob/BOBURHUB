import { useEffect } from "react";
import headercss from "../header/Header.module.css";
import css from "./ComingSoon.module.css";
import { id } from "../functions";
export default () => {
  useEffect(() => {
    id(css.coming).style.opacity = 1;
  });
  return (
    <div id={css.coming}>
      <div id={css.text}>
        COMING
        <div id={css.soon}>SOON</div>
      </div>
    </div>
  );
};
