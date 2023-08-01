import headerCss from "./Header.module.css";
import { clas, id } from "../functions";
import contentCss from "../body/Content.module.css";
export default (focus, mobile) => {
  const input = id(headerCss.search);
  const searchResult = id(headerCss.searchResult);
  const result = id(headerCss.result);
  const firstPost = clas(contentCss.post)[0];
  searchResult.style.transition =
    "background-color 0.4s 0.2s ease-out, width 0.5s ease-in-out";
  if (focus) {
    result.style.height = "0";
    input.style.transition =
      "background-color 0.4s 0.2s ease-out, width 0.4s ease-in-out, margin-left 0.4s ease-in-out";
    result.style.transition =
      "background-color 0.4s 0.2s ease-out, height 0.4s 0.4s ease-in-out";
  } else {
    input.style.transition =
      "background-color 0.4s 0.2s ease-out, width 0.4s 0.4s ease-in-out, margin-left 0.3s 0.3s ease-in-out";
    result.style.transition =
      "background-color 0.4s 0.2s ease-out, height 0.4s ease-in-out";
  }
  if (window.innerWidth > 700) {
    if (mobile) {
      // Mobile > 700
      input.style.width = "100%";
      result.style.width = "60dvw";
      result.style.left = "50dvw";
      result.style.transform = "translateX(-50%)";
      if (focus) {
        searchResult.style.width = "55%";
        result.style.height = "40dvh";
      } else {
        searchResult.style.width = "35%";
        result.style.height = "0";
      }
    } else {
      // Desktop > 700
      searchResult.style.width = firstPost.getBoundingClientRect().width + "px";
      result.style.width = searchResult.getBoundingClientRect().width + "px";
      result.style.left = searchResult.getBoundingClientRect().left + "px";
      result.style.transform = "none";
      if (focus) {
        input.style.width = "100%";
        result.style.height = "40dvh";
      } else {
        input.style.width = "40%";
        result.style.height = "0";
      }
    }
  } else {
    // window.innerWidth <= 700
    input.style.width = "100%";
    result.style.width = "80dvw";
    result.style.left = "50dvw";
    result.style.transform = "translateX(-50%)";
    if (focus) {
      searchResult.style.width = "55%";
      result.style.height = "40dvh";
      input.style.marginLeft = "5%";
    } else {
      searchResult.style.width = "35%";
      result.style.height = "0";
      input.style.marginLeft = "0";
    }
  }
};
