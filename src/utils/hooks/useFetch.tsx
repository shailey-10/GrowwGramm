import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "../types/user";
import { Post } from "../types/post";
import { Collection } from "../types/collection";

function useFetch(
  url: string,
  user: boolean,
  userUrl: string,
  collectionUrl: string
) {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionChange, setCollectionChange] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUser(userUrl, url);
    } else {
      const currentDate = new Date().getTime();

      if (localStorage.getItem("date") && localStorage.getItem("cachedPosts")) {
        const oldDate = localStorage.getItem("date");
        const olDate = parseInt(oldDate!);

        if (currentDate - olDate >= 3600000) {
          localStorage.removeItem("date");
          localStorage.removeItem("cachedPosts");
          refetch(url, true);
        } else {
          let obj = localStorage.cachedPosts;
          setData([...JSON.parse(obj)]);
        }
      } else {
        refetch(url, true);
      }

      if (localStorage.getItem("collections")) {
        const oldDate = localStorage.getItem("date");
        const olDate = parseInt(oldDate!);

        if (currentDate - olDate >= 3600000) {
          localStorage.removeItem("collections");
          fetchCollection(collectionUrl, true);
        } else {
          let obj = localStorage.collections;
          setCollections([...JSON.parse(obj)]);
        }
      } else {
        fetchCollection(collectionUrl, true);
      }
    }
  }, [url]);

  const fetchCollection = (collectionUrl: string, first: boolean) => {
    setLoading(true);
    axios
      .get(collectionUrl)
      .then((res) => {
        if (first) {
          const cache = [...res.data];

          localStorage.setItem("collections", JSON.stringify(cache));
          setCollections(cache);
        } else {
          setCollections([...res.data]);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .then(() => {
        refetch(url, false);
      })

      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchUser = (userUrl: string, url: string) => {
    setLoading(true);
    axios
      .get(userUrl)
      .then((res) => {
        setCurrentUser(res.data);
        refetch(url, false);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refetch = (url: string, first: boolean) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (first) {
          const cache = [...res.data];

          localStorage.setItem("cachedPosts", JSON.stringify(cache));
          setData(cache);
        } else {
          setData((prevPosts) => [...prevPosts, ...res.data]);
        }
        const date = new Date().getTime().toString();
        localStorage.setItem("date", date);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const collectionPhotos = (collectionPhotosUrl: string) => {
    setLoading(true);
    setCollectionChange(true);
    axios
      .get(collectionPhotosUrl)
      .then((res) => {
        setData([...res.data]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setCollectionChange(false);
      });
  };

  return {
    data,
    loading,
    refetch,
    error,
    currentUser,
    fetchUser,
    collections,
    collectionPhotos,
    collectionChange,
  } as const;
}

export default useFetch;
