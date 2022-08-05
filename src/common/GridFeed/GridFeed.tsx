import { animated as a } from "react-spring";

import GridCard from "../GridCard/GridCard";

import { Post } from "../../utils/types/post";
import { TopTobottom } from "../../utils/animations/topToBottom";

type GridProps = {
  posts: Post[] | undefined;
  handleView: (id: string) => void;
};

function GridFeed(props: GridProps) {
  const animatedProps = TopTobottom();

  return (
    <>
      {props.posts?.map((post, i) => (
        <a.div style={{ ...animatedProps }} key={post.id}>
          <GridCard
            handleView={props.handleView}
            post={post}
            id={i.toString()}
          />
        </a.div>
      ))}
    </>
  );
}

export default GridFeed;
