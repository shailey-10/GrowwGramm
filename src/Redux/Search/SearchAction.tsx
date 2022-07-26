import { FETCH_SEARCH_FALIURE, FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS } from "./SearchTypes.tsx"
import axios from 'axios'

export const fetchSearchRequest = () => {
    return{
        type: FETCH_SEARCH_REQUEST
    }
}

export const fetchSearchSucccess = search => {
    return{
        type: FETCH_SEARCH_SUCCESS,
        payload: search
    }
}

export const fetchSearchFaliure = error => {
    return{
        type: FETCH_SEARCH_FALIURE,
        payload: error
    }
}

export const fetchSearch = (value) => {
    console.log(value)
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    return (dispatch) => {
        dispatch(fetchSearchRequest)
        axios.get(`${apiRoot}/search/photos?page=1&query=${value}&client_id=${accessKey}`)
        .then(res => {
            const search = res.data.results
            dispatch(fetchSearchSucccess(search))
        })
        .catch(error => {
            const errorMsg = error.message
            console.log(error)
            dispatch(fetchSearchFaliure(errorMsg))
        })
    }
}