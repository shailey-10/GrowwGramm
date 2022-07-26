import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// @ts-ignore
import rootReducer from "./RootReducer.tsx";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;