import css from "./Content.module.css";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import Post from "./Post";
import loading from "../assets/loading.gif";
import headercss from "../header/Header.module.css";
import { clas, id } from "../functions";

export default (props) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState([]);
  const [premiumUsers, setPremiumUsers] = useState(["bobur_khayitov"]);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props || Object.keys(props).length === 0) {
      unsubscribe = db.collection("posts").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
    }

    const unsubscribe1 = db
      .collection("premiumUsers")
      .doc("premium")
      .onSnapshot((userArr) => {
        console.log("premium changed");
        setPremiumUsers(userArr.data().premium);
      });
    return () => {
      unsubscribe();
      unsubscribe1();
    };
  }, []);

  useEffect(() => {
    if (!props || Object.keys(props).length === 0) {
      const fetchContent = async () => {
        const contentArray = await Promise.all(
          posts
            .slice()
            .sort((a, b) => b.date - a.date)
            .map(async (data, index) => {
              const url = data.profilePic
                ? await storage.refFromURL(data.profilePic).getDownloadURL()
                : null;
              return (
                <Post
                  userName={data.userName}
                  profileSrc={url}
                  contentSrc={data.contentSrc}
                  caption={data.caption}
                  key={"post" + index}
                  user={data.user}
                  postId={data.postId}
                  likers={data.likers}
                  viewers={data.viewers}
                  premiumUsers={premiumUsers}
                />
              );
            })
        );

        setContent(contentArray);
      };

      fetchContent();
    }
  }, [posts, premiumUsers]);

  return (
    <div id={css.content} className={props.className}>
      <Post className="invisible" />
      {(!props || Object.keys(props).length === 0) && content.length == 0 ? (
        <img src={loading} id={css.loading} />
      ) : (
        content
      )}
    </div>
  );
};
