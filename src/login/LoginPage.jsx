import Login from "./Login";
import css from "./login.module.css";
export default () => {
  return (
    <div id={css.root}>
      <div id={css.header}>
        <div id={css.welcome}>
          Welcome to{" "}
          <span id={css.brand}>
            BOBUR <span id={css.hub}>HUB</span>
          </span>
        </div>
      </div>

      <Login />
    </div>
  );
};
