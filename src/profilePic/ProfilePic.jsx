import { useSelector } from "react-redux";
export default (props) => {
  const profilePic = props.src;
  const user = props.user;
  const className = props.className;
  const id = props.id;
  return profilePic ? (
    <img
      id={id}
      className={"profilePic " + className}
      src={profilePic}
      alt="Profile pic"
    />
  ) : (
    <div className={"profilePic backdrop " + className} id={id}>
      {user ? user[0].toUpperCase() : null}
    </div>
  );
};
