import { Post } from "../../utils/types/post";

import "./GridCard.css";

type GridCardTypes = {
  post: Post;
  id: string;
  handleView: (id: string) => void;
};

function GridCard(props: GridCardTypes) {
  return (
    <div className="grc132GridPost">
      <img
        src={props.post.urls.regular}
        alt="post"
        onClick={() => props.handleView(props.id)}
      />
    </div>
  );
}

export default GridCard;
