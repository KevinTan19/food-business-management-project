const BASE_URL = `http://localhost:4002/`;
export const fetchItemSuccess = function (payload) {
  return {
    type: "item/fetchItemSuccess",
    payload,
  };
};

export const fetchItem = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}item/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(fetchItemSuccess(data.data));
      });
  };
};
