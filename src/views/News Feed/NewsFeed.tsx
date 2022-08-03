import { useState } from "react";
import { animated as a } from "react-spring";

import Loader from "../../common/Loader/Loader";
import ReccomendedUserCard from "../../common/ReccomendedUserCard/ReccomendedUserCard";
import { TopTobottom } from "../../utils/animations/topToBottom";
import Collection from "./Collection/Collection";
import Feed from "../../common/Feed/Feed";
import useFetch from "../../utils/hooks/useFetch";
import ErrorPage from "../Error/ErrorPage";

import "./NewsFeed.css";

function NewsFeed() {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const pageNumber = 1;
  const [page, setPage] = useState(pageNumber);

  const {
    data: posts,
    error,
    loading,
    refetch,
    collections,
    collectionPhotos,
    collectionChange,
  } = useFetch(
    `${apiRoot}/photos/random?client_id=${accessKey}&count=10`,
    false,
    "",
    `${apiRoot}/collections?client_id=${accessKey}&page=${
      Math.floor(Math.random() * (1 + 100 - 1)) + 1
    }&per_page=6`
  );
  console.log(posts);
  const animatedProps = TopTobottom();

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight - 0.5
    ) {
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    refetch(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`, false);
    setPage(page + 1);
  };

  return (
    <div className="nef123Home">
      {error ? (
        <ErrorPage error={error.message} />
      ) : posts && collections && !collectionChange ? (
        <a.div style={{ ...animatedProps }}>
          <Collection
            collections={collections}
            collectionPhotos={collectionPhotos}
          />
          <div className="nef123HomeContainer">
            <div>
              {posts ? (
                <Feed toggleSaved={() => {}} posts={posts} search={undefined} />
              ) : null}
              {loading ? (
                <div className="nef123Loader">
                  {" "}
                  <Loader />{" "}
                </div>
              ) : null}
            </div>
            <div className="nef123Users">
              {posts && !loading ? <h2>Users You Might Like</h2> : null}
              {posts
                ? posts
                    .slice(0, 6)
                    .map((post, i) => (
                      <ReccomendedUserCard user={post.user} key={i} />
                    ))
                : null}
            </div>
          </div>
        </a.div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default NewsFeed;
