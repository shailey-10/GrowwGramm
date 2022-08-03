import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Feed from "../../common/Feed/Feed";
import Loader from "../../common/Loader/Loader";
import ErrorPage from "../Error/ErrorPage";

import "./SavedFeed.css";

type Error = {
  error: String;
};

export const SavedFeed = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const err = {
      error: "No posts saved yet",
    };
    let savedPosts = localStorage.getItem("saved");
    if (savedPosts) {
      let parsedPosts = JSON.parse(savedPosts);
      if (parsedPosts.length === 0) {
        setError(err);
      } else {
        setSavedPosts(parsedPosts);
      }
    } else {
      setError(err);
    }
  }, []);

  useEffect(() => {
    const err = {
      error: "No posts saved yet",
    };
    let savedPosts = localStorage.getItem("saved");
    if (savedPosts) {
      let parsedPosts = JSON.parse(savedPosts);
      if (parsedPosts.length === 0) {
        setError(err);
      }
    }
  }, [savedPosts]);

  const toggleSaved = (posts: []) => {
    setSavedPosts(posts);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerHeight }}
    >
      {error ? (
        <ErrorPage error={error.error} />
      ) : savedPosts.length > 0 ? (
        <div className="saf123SavedPosts">
          <h2>Your Saved Posts</h2>
          <Feed
            toggleSaved={toggleSaved}
            posts={savedPosts}
            search={undefined}
          />
        </div>
      ) : (
        <Loader />
      )}
    </motion.div>
  );
};
