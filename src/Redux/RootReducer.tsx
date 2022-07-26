import { combineReducers } from "redux";
import reducer from "./Search/SearchReducers.tsx";
import userReducer from "./User/UserReducers.tsx";

const rootReducer = combineReducers({
    reducer: reducer,
    userReducer: userReducer
})

export default rootReducer