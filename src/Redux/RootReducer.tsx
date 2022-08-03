import { combineReducers } from "redux";
import reducer from "./Search/SearchReducers";
import userReducer from "./User/UserReducers";

const rootReducer = combineReducers({
  reducer: reducer,
  userReducer: userReducer,
});

export default rootReducer;
