import { Link } from "react-router-dom";

import { User } from "../../utils/types/collection";

import "./reccomendedUserCard.css";

type UserProps = {
  user: User;
};

function ReccomendedUserCard(props: UserProps) {
  const currentUser = props.user;
  let username = currentUser.username;
  let bio;
  if (currentUser.bio) {
    bio = currentUser.bio.slice(0, 40);
  }

  return (
    <div className="ruc123UserCard">
      <Link to={"/user/" + username}>
        <h2>{currentUser.name}</h2>
      </Link>
      <p>@{currentUser.username}</p>
      <p>{currentUser.bio?.length > 0 ? bio + ".." : null}</p>
      <p>Posts: {currentUser.total_photos}</p>
    </div>
  );
}

export default ReccomendedUserCard;
