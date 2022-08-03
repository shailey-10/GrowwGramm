import { connect } from "react-redux";
import { motion } from "framer-motion";

import FeedCard from "../../common/FeedCard/FeedCard";
import Loader from "../../common/Loader/Loader";
import { Search } from "../../utils/types/search";
import ErrorPage from "../Error/ErrorPage";

import "./SearchFeed.css";

function SearchFeed({ searchData }: { searchData: any }) {
  const search: Search[] = searchData.reducer.search;
  console.log(searchData);

  return (
    <motion.div
      className="sef123SearchFeed"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerHeight }}
    >
      {searchData.reducer.loading ? (
        <div className="loader">
          {" "}
          <Loader />{" "}
        </div>
      ) : searchData.reducer.error ? (
        <ErrorPage error={searchData.reducer.error} search={true} />
      ) : searchData.reducer.search.length > 0 &&
        !searchData.reducer.loading ? (
        <div>
          {search.map((searchPost, i) => (
            <div key={i}>
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
        <p>Please type some shit</p>
      )}
    </motion.div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    searchData: state,
  };
};

export default connect(mapStateToProps)(SearchFeed);
