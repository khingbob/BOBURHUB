import { id } from "../functions";
import css from "./Header.module.css";
import searchSetup from "./searchSetup";
export default () => {
  return (
    <div id={css.searchResult}>
      <div id={css.search}>
        <div id={css.searchIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15 15L21 21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                strokeWidth="2"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <input id={css.searchInput} placeholder="Search" />
      </div>
    </div>
  );
};
