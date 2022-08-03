import {
  FETCH_SEARCH_FALIURE,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
} from "./SearchTypes";

import axios from "axios";

export const fetchSearchRequest = (req: any) => {
  return {
    type: FETCH_SEARCH_REQUEST,
    payload: req,
  };
};

export const fetchSearchSucccess = (search: any, value: string) => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: search,
    value: value,
  };
};

export const fetchSearchFaliure = (error: any) => {
  return {
    type: FETCH_SEARCH_FALIURE,
    payload: error,
  };
};

export const fetchSearch = (value: any) => {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch(fetchSearchRequest(null));
    axios
      .get(
        `${apiRoot}/search/photos?page=1&query=${value}&client_id=${accessKey}`
      )
      .then((res) => {
        const search = res.data.results;
        dispatch(fetchSearchSucccess(search, value));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSearchFaliure(errorMsg));
      });
  };
};
