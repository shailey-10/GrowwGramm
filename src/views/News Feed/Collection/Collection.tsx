import { Collection as Collections } from "../../../utils/types/collection";

type CollectionProps = {
  collections: Collections[];
  collectionPhotos: (collectionPhotosUrl: string) => void;
};

const Collection = (props: CollectionProps) => {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;
  return (
    <div className="nef123Collections">
      {props.collections
        ? props.collections.map((collection, i) => (
            <div
              key={collection.id}
              className="nef123Collection"
              onClick={() =>
                props.collectionPhotos(
                  `${apiRoot}/collections/${collection.id}/photos?client_id=${accessKey}&per_page=30`
                )
              }
            >
              <img src={collection.cover_photo.urls.thumb} alt="" />
              <p>{collection.title.slice(0, 5)}..</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default Collection;
