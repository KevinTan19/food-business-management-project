import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducers";
import thunk from "redux-thunk";

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
