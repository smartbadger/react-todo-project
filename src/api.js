const API_URL = "https://jsonplaceholder.typicode.com";
const HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
};

// simple random number generator used to avoid duplicate id's from mock api
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// url helper to add query params
const makeURL = (endpoint, params = {}) => {
  const search = Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `${endpoint}${search.length ? "?" + search : ""}`;
};

/**
 * Get todos
 * @param {Object} params
 * @returns {Promise}
 */
export const getTodos = (params) => {
  return fetch(makeURL(`${API_URL}/todos`, params), {
    method: "GET",
    headers: HEADERS,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });
};

/**
 * create todo
 * @param {Object} payload
 * @returns {Promise}
 */
export const createTodo = (payload) => {
  return (
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      // random number for id for multiple creates,
      // multiple create calls end up having duplicate id returned
      .then((data) => {
        return { ...data, id: getRandomInt(1000, 10000) };
      })
      .catch((err) => {
        console.error(err);
        return;
      })
  );
};

/**
 * update todo
 * @param {Number|String} id
 * @param {Object} payload
 * @returns {Promise}
 */
export const updateTodo = (id, payload) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return;
    });
};

/**
 * delete todo
 * @param {Number|String} id
 * @returns {Promise}
 */
export const deleteTodo = (id) => {
  return fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.ok)
    .catch((err) => {
      console.error(err);
      return;
    });
};

/**
 * get user
 * @param {Number|String} id
 * @returns {Promise}
 */
export const getUser = (id) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: HEADERS,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return;
    });
};
