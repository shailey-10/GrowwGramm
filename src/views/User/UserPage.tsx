import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarker, FaList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import Feed from "../../common/Feed/Feed";
import Loader from "../../common/Loader/Loader";
import GridFeed from "../../common/GridFeed/GridFeed";
import useFetch from "../../utils/hooks/useFetch";
import ErrorPage from "../Error/ErrorPage";

import "./UserPage.css";

function UserPage() {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  let { id } = useParams();

  if (id === undefined) {
    id = localStorage.getItem("user") as string;
  }
  const pageNumber = 1;

  const [page, setPage] = useState(pageNumber);
  const [gridView, setGridView] = useState(false);
  const [postId, setPostId] = useState("");

  const {
    data: userPosts,
    error,
    loading,
    refetch,
    currentUser: user,
  } = useFetch(
    `${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=30&page=${page}`,
    true,
    `${apiRoot}/users/${id}?client_id=${accessKey}`,
    ""
  );

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 0.5
    ) {
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    if (user) {
      setPage(page + 1);
      if (Math.ceil(user?.total_photos / 30) - 1 > page && page > 1)
        if (Math.ceil(user?.total_photos / 30) - 1 === page) {
          refetch(
            `${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=30&page=${page}`,
            false
          );
        } else {
          const noPosts = user.total_photos % 30;
          refetch(
            `${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=${noPosts}&page=${page}`,
            false
          );
        }
    }
  };

  const handleView = (id: string) => {
    setGridView(false);
    setPostId(id);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log(id.toString());
  };

  useEffect(() => {
    localStorage.setItem("user", id as string);
  }, [id]);
  useEffect(() => {
    console.log(page);
  }, [page]);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    document.getElementById(postId)?.scrollIntoView();
  }, [postId]);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerHeight }}
    >
      {error ? (
        <ErrorPage error={error.message} />
      ) : id === "null" ? (
        <h3>No recent user, view some profiles!</h3>
      ) : (
        <div>
          {user ? (
            <div>
              <div className="usp123Profile">
                <div className="usp123ProfileImage">
                  {user?.profile_image ? (
                    <img src={user.profile_image.large} alt="profile" />
                  ) : null}
                </div>
                <div className="usp123UserInfo">
                  <p className="usp123Username">{id}</p>
                  <div className="usp123UserData">
                    <p>
                      {" "}
                      <span className="usp123Data">
                        {" "}
                        {user?.total_photos}{" "}
                      </span>{" "}
                      Posts
                    </p>
                    <p>
                      {" "}
                      <span className="usp123Data">
                        {user?.followers_count}{" "}
                      </span>{" "}
                      Followers
                    </p>
                    <p>
                      {" "}
                      <span className="usp123Data">
                        {user?.following_count}{" "}
                      </span>
                      Following
                    </p>
                  </div>
                  <div className="usp123UserContent">
                    <p>{user?.name}</p>
                    <p>{user?.bio}</p>
                    {user.location ? (
                      <p>
                        <FaMapMarker /> {user?.location}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <div className="usp123Views">
                  <FaList
                    onClick={() => {
                      setGridView(false);
                    }}
                  />
                  <BsFillGrid3X3GapFill
                    onClick={() => {
                      setGridView(true);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {userPosts ? (
            !gridView ? (
              <Feed
                toggleSaved={() => {}}
                search={undefined}
                posts={userPosts}
              />
            ) : null
          ) : null}
          <div className="usp123GridView">
            {gridView ? (
              <GridFeed handleView={handleView} posts={userPosts} />
            ) : null}
            {loading ? (
              <div className="loader">
                {" "}
                <Loader />{" "}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default UserPage;
