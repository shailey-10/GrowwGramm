import { SET_RECENT_USER } from "./UserTypes.tsx"

export const setCurrentUser = user => {
    return{
        type: SET_RECENT_USER,
        payload: user
    }
}



export const fetchCurrentUser = (user) => {
  
    return (dispatch) => {
        dispatch(setCurrentUser(user))
        
    }
}