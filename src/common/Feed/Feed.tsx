import { animated as a } from "react-spring";
import { TopTobottom } from "../../utils/animations/topToBottom";

import { Post } from "../../utils/types/post";
import { Search } from "../../utils/types/search";
import FeedCard from "../FeedCard/FeedCard";

import "./Feed.css";

type PostProps = {
  posts: Post[] | undefined;
  search: Search[] | undefined;
  toggleSaved: (posts: []) => void | undefined;
};

const Feed = (props: PostProps) => {
  const animatedProps = TopTobottom();

  return (
    <a.div style={{ ...animatedProps }} className="fed123ImageFeed">
      <div className="fed123ImageContent">
        <div className="fed123PostsContainer">
          {props.posts?.map((post: Post, i) => (
            <FeedCard
              toggleSaved={props.toggleSaved}
              search={undefined}
              post={post}
              id={i.toString()}
              key={i}
            />
          ))}
        </div>
      </div>
    </a.div>
  );
};

export default Feed;
