import { SET_RECENT_USER } from "./UserTypes"

export const setCurrentUser = (user: any) => {
    return{
        type: SET_RECENT_USER,
        payload: user
    }
}



export const fetchCurrentUser = (user: any) => {
  
    return (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch(setCurrentUser(user))
        
    }
}