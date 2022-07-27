import { FETCH_SEARCH_FALIURE, FETCH_SEARCH_REQUEST, FETCH_SEARCH_SUCCESS } from "./SearchTypes"

const initialState = {
    loading : false,
    search : [],
    error :''
}

const reducer = (state = initialState, action: { type: any; payload: any }) => {
        switch(action.type){
            case FETCH_SEARCH_REQUEST:
                return{
                    ...state,
                    loading : true
                }
                case FETCH_SEARCH_SUCCESS:
                    return{
                        ...state,
                        loading : false,
                        search : action.payload,
                        error: ''
                    }
                    case FETCH_SEARCH_FALIURE:
                return{
                    ...state,
                    loading : false,
                    search : [],
                    error : action.payload
                }   
                default :
                return state 
        }
}

export default reducer;