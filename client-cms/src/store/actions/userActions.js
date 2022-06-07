const BASE_URL = `http://localhost:4002/`;
export const loginSuccess = function (payload) {
  return {
    type: "user/loginSuccess",
    payload,
  };
};

export const logoutSuccess = function () {
  return {
    type: "user/logoutSuccess",
  };
};

export const registerSuccess = function (payload) {
  return {
    type: "user/registerSuccess",
    payload,
  };
};

export const loginUser = (payload) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(loginSuccess(data));
        localStorage.setItem("access_token", data.access_token);
      });
  };
};

export const registerUser = (payload) => {
  return (dispatch) => {
    fetch(`${BASE_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(registerSuccess(data));
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutUser = () => {
  localStorage.clear();
  return (dispatch) => {
    dispatch(logoutSuccess);
  };
};
