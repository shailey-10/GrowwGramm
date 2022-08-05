import { Link } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

import { Post } from "../../utils/types/post";
import { Search } from "../../utils/types/search";
import { useState, useEffect } from "react";
import { BlurImg } from "../BlurHash";

import "./feedCard.css";

type CardProps = {
  post: Post | undefined;
  search: Search | undefined;
  id: string;
  toggleSaved: (posts: []) => void | undefined;
};

function FeedCard(props: CardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (props.post) {
      let savedPosts = localStorage.getItem("saved");
      if (savedPosts) {
        let parsedPosts = JSON.parse(savedPosts);
        const isFound = checkSavedPosts(parsedPosts);
        if (isFound) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      }
    }
  }, []);

  const checkSavedPosts = (parsedPosts: []) => {
    const isFound = parsedPosts.some((element: { id: string | undefined }) => {
      if (element.id === props.post?.id) {
        return true;
      } else {
        return false;
      }
    });
    return isFound;
  };

  const addToSaved = () => {
    if (localStorage.getItem("saved")) {
      let savedPosts = localStorage.getItem("saved");
      if (savedPosts) {
        let parsedPosts = JSON.parse(savedPosts);
        const isFound = checkSavedPosts(parsedPosts);
        if (isFound) {
          const indexOfObject = parsedPosts.findIndex(
            (object: { id: string }) => {
              return object.id === props.post?.id;
            }
          );
          setSaved(false);
          parsedPosts.splice(indexOfObject, 1);
          localStorage.setItem("saved", JSON.stringify(parsedPosts));
          props.toggleSaved(parsedPosts);
        } else {
          setSaved(true);
          let updatedSavedPosts = [...parsedPosts, props.post];
          localStorage.setItem("saved", JSON.stringify(updatedSavedPosts));
        }
      }
    } else {
      const post = [props.post];
      localStorage.setItem("saved", JSON.stringify(post));
    }
  };

  return (
    <div className="fec123Post" id={props.id}>
      <BlurImg
        blurhash={
          props.post
            ? props.post.blur_hash
            : props.search
            ? props.search.blur_hash
            : ""
        }
        height={500}
        src={
          props.post
            ? props.post.urls.regular
            : props.search
            ? props.search.urls.regular
            : ""
        }
        width={100}
      />

      <div className="fec123UserData">
        <div className="fec123Likes">
          <p>
            {props.post
              ? props.post.likes
              : props.search
              ? props.search.likes
              : null}
            Likes
          </p>
          <div className="nef123Save">
            {props.post ? (
              saved ? (
                <FaBookmark onClick={addToSaved} />
              ) : (
                <FaRegBookmark onClick={addToSaved} />
              )
            ) : null}
          </div>
        </div>

        <div className="fec123User">
          <img
            src={
              props.post
                ? props.post.user.profile_image.small
                : props.search
                ? props.search.user.profile_image.small
                : ""
            }
            alt=""
          />
          <>
            <p className="fec123Name">
              <Link
                to={
                  "/user/" +
                  (props.post
                    ? props.post.user.username
                    : props.search
                    ? props.search.user.username
                    : "")
                }
              >
                {props.post
                  ? props.post.user.username
                  : props.search
                  ? props.search.user.username
                  : ""}
              </Link>
              <span className="fec123Description">
                {props.post
                  ? props.post.description
                  : props.search
                  ? props.search.description
                  : ""}
              </span>
            </p>
          </>
        </div>
        <>
          <p>
            {props.post
              ? props.post.created_at.toString().slice(0, 10)
              : props.search
              ? props.search.created_at.toString().slice(0, 10)
              : null}
          </p>
        </>
      </div>
    </div>
  );
}

export default FeedCard;
