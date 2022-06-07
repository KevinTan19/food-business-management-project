let initialState = { user: {}, newUser: {} };
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/loginSuccess":
      return { ...state, user: action.payload };
    case "user/registerSuccess":
      return { ...state, newUser: action.payload };
    case "user/logoutSuccess":
      return { ...state, user: null };
    default:
      return state;
  }
}
export default userReducer;
