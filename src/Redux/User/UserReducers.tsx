import { SET_RECENT_USER } from "./UserTypes.tsx";

const initialState = {
    recentUser : {}
}

const userReducer = (state = initialState, action) => {
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