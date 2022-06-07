let initialState = { items: [] };
function itemReducer(state = initialState, action) {
  switch (action.type) {
    case "item/fetchItemSuccess":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
export default itemReducer;
