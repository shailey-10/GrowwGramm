import { connect } from "react-redux";
import { motion } from "framer-motion";

import FeedCard from "../../common/FeedCard/FeedCard";
import Loader from "../../common/Loader/Loader";

import { Search } from "../../utils/types/search";

import ErrorPage from "../Error/ErrorPage";

import "./searchFeed.css";

type StateProps = {
  reducer: {
    error: string;
    loading: boolean;
    search: [];
    value: {};
  };
  userReducer: {
    recentUser: {};
  };
};

function SearchFeed({ searchData }: { searchData: StateProps }) {
  const search: Search[] = searchData.reducer.search;

  return (
    <motion.div
      className="sef123SearchFeed"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerHeight }}
    >
      {searchData.reducer.loading ? (
        <div className="nef123Loader">
          <Loader />
        </div>
      ) : searchData.reducer.error ? (
        <ErrorPage error={searchData.reducer.error} />
      ) : searchData.reducer.search.length > 0 &&
        !searchData.reducer.loading ? (
        <div>
          {search.map((searchPost, i) => (
            <div key={searchPost.id}>
              <FeedCard
                toggleSaved={() => {}}
                post={undefined}
                search={searchPost}
                id={i.toString()}
              />
            </div>
          ))}
        </div>
      ) : searchData.reducer.value && !searchData.reducer.loading ? (
        <p>No images found</p>
      ) : (
        <p>Please type something</p>
      )}
    </motion.div>
  );
}

const mapStateToProps = (state: StateProps) => {
  return {
    searchData: state,
  };
};

export default connect(mapStateToProps)(SearchFeed);
