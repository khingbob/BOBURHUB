import { useEffect, useState } from "react";
import css from "./login.module.css";
import { db, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { id } from "../functions";
export default () => {
  const user = useSelector((store) => store.setUser);
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState(true);
  const [eyeOpen, setEye] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState("");
  const [passStatus, setPassStatus] = useState("");
  const [loginGood, setLoginGood] = useState(false);
  const [error, setError] = useState(null);
  const allUsers = [];
  let userName = "";
  let password = "";
  async function getData() {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allUsers.push(doc.id.replaceAll(" ", "").toLowerCase());
        });
      })
      .then(() => {});
  }
  getData();

  function authenticate(e) {
    e.preventDefault();
    userName = document.getElementById(css.name).value;
    password = document.getElementById(css.pass).value;
    if (signUp && userNameStatus == "Valid ☑️") {
      auth
        .createUserWithEmailAndPassword(`${userName}@gmail.com`, password)
        .then(
          db
            .collection("users")
            .doc(userName.toLowerCase())
            .set({
              userName: userName.replace("_", " "),
              posts: [],
              following: [],
              followers: [],
              profilePic: null,
              stories: null,
            })
        )
        .catch((err) => {
          if (err.message == "The email address is badly formatted.") {
            setError("Your username is weird");
          } else setError(err.message);
        });
    } else if (!signUp && loginGood) {
      auth
        .signInWithEmailAndPassword(`${userName}@gmail.com`, password)
        .catch((err) => {
          if (err.message == "The email address is badly formatted.") {
            setError("Your username is wrong");
          } else setError(err.message);
        });
    }
  }

  const nameCheck = () => {
    userName = id(css.name).value;
    if (userName == "") {
      document.getElementById(css.submit).className = css.noLogin;
      setUserNameStatus("");
      setLoginGood(false);
    } else if (userName.includes("@")) {
      document.getElementById(css.submit).className = css.noLogin;
      document.getElementById(css.userNameStatus).className = css.userBad;
      setUserNameStatus("Why tf would you use a @ in your username?");
      setLoginGood(false);
    } else if (userName.includes(" ")) {
      document.getElementById(css.submit).className = css.noLogin;
      document.getElementById(css.userNameStatus).className = css.userBad;
      setUserNameStatus("There is no space for a space");
      setLoginGood(false);
    } else if (!signUp) {
      setLoginGood(true);
    } else if (signUp) {
      if (allUsers.indexOf(userName.toLowerCase().replaceAll(" ", "")) >= 0) {
        console.log("Name taken");
        document.getElementById(css.submit).className = css.noLogin;
        document.getElementById(css.userNameStatus).className = css.userBad;
        setUserNameStatus("The name is already taken");
      } else {
        document.getElementById(css.submit).className = "";
        document.getElementById(css.userNameStatus).className = css.userGood;
        setUserNameStatus("Valid ☑️");
      }
    }
  };
  useEffect(() => {
    setUserNameStatus("");
    setPassStatus("");
    nameCheck();
    document.getElementById(css.name).oninput = (e) => {
      nameCheck();
    };
    document.getElementById(css.pass).oninput = (e) => {
      if (signUp) {
        password = e.target.value;
        if (password.length == 0) {
          document.getElementById(css.submit).className = css.noLogin;
          setPassStatus("");
        } else if (password.length < 6) {
          document.getElementById(css.submit).className = css.noLogin;
          document.getElementById(css.passStatus).className = css.passBad;
          setPassStatus("Your password has to be at least 6 charecters long");
        } else {
          document.getElementById(css.submit).className = "";
          document.getElementById(css.passStatus).className = "";
          setPassStatus("Valid ☑️");
        }
      } else {
        document.getElementById(css.submit).className = "";
      }
    };
  }, [signUp]);
  return (
    <div id={css.login}>
      <div id={css.left}>
        <div id={css.logoId}>
          <div id={css.leftLogo}>
            BOBUR <span id={css.id}>ID</span>
          </div>
          <div id={css.boburId}>
            {signUp ? "Sign up for your new " : "Log in with your "}
            <span>BOBUR ID</span>
          </div>
        </div>
        <div id={css.leftDetails}>
          <div className={css.details}>
            <svg
              className={css.detailsIcons}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
            </svg>
            <div id={css.single}>Single account for all BOBUR services</div>
          </div>
          <div className={css.details}>
            <svg
              className={css.detailsIcons}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="m10 17 5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            <div id={css.quick}>Next time you will already be Logged in.</div>
          </div>
          <div className={css.details}>
            <svg
              id={css.lock}
              className={css.detailsIcons}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            <div id={css.unsafe}>Unsafe privacy and security</div>
          </div>
        </div>
      </div>
      <div id={css.right}>
        <div id={css.bh}>
          <span>BH</span>
        </div>
        <form
          onSubmit={(e) => {
            authenticate(e);
          }}
        >
          <div className={css.formEl}>
            <label htmlFor={css.name}>User Name</label>
            <br />
            <input
              type="text"
              name="name"
              id={css.name}
              className={css.input}
              placeholder={signUp ? "Create a username" : "Enter your username"}
            />
            <div id={css.userNameStatus}>{userNameStatus}</div>
          </div>
          <div className={css.formEl}>
            <label htmlFor={css.pass}>Password</label>
            <br />
            <div id={css.password} className={css.input}>
              <input
                type={eyeOpen ? "text" : "password"}
                name="pass"
                id={css.pass}
                placeholder={
                  signUp ? "Create a password" : "Enter your password"
                }
              />
              <div id={css.eyeDiv}>
                {eyeOpen ? (
                  <svg
                    onClick={() => {
                      id(css.pass).focus();
                      setTimeout(() => {
                        id(css.pass).setSelectionRange(
                          id(css.pass).value.length,
                          id(css.pass).value.length
                        );
                      });
                      setEye(false);
                    }}
                    id={css.eye}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      id(css.pass).focus();
                      setTimeout(() => {
                        id(css.pass).setSelectionRange(
                          id(css.pass).value.length,
                          id(css.pass).value.length
                        );
                        setEye(true);
                      });
                    }}
                    id={css.eye}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <path d="m1 1 22 22" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  </svg>
                )}
              </div>
            </div>
            <div id={css.passStatus}>{passStatus}</div>
          </div>
          <div className={css.formEl} id={css.submitDiv}>
            <input
              type="submit"
              value={signUp ? "Sign Up" : "Log In"}
              id={css.submit}
              className={css.noLogin}
            />
            {error && <div id={css.error}>{error}</div>}
          </div>
          <div id={css.orLogIn}>
            <span
              onClick={() => {
                setError(null);
                setSignUp(!signUp);
              }}
            >
              {signUp ? "Or log in" : "Or sign up"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
