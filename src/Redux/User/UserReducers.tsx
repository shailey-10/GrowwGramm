import { SET_RECENT_USER } from "./UserTypes";

const initialState = {
    recentUser : {}
}

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch(action.type){
        case SET_RECENT_USER:
            return{
                ...state,
                recentUser : action.payload
            }
               
            default :
            return state 
    }
}

export default userReducer;