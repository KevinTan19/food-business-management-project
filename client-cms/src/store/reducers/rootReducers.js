import { combineReducers } from "redux";
import userReducer from "./userReducer";
// let initialState = { value: 15, posts: [], users: [] };
// function RootReducer(state = initialState, action) {
//   switch (action.type) {
//     case "posts/fetchSuccess":
//       return { ...state, posts: action.payload };
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
