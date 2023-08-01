import { clas } from "../functions";
import css from "./Content.module.css";
export default () => {
  if (window.innerWidth > window.innerHeight) {
    for (var i = 0; i < clas(css.post).length; i++) {
      id(contentCss.content).style.height = "80dvh";
      id(contentCss.content).style.width = "auto";
    }
  } else {
    id(contentCss.content).style.height = "auto";
    id(contentCss.content).style.width = "50vw";
  }
};
