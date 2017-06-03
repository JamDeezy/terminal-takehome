import "whatwg-fetch";

const BASE_URL = "/api";

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export function post(endpoint, body) {
  const method = "POST";
  const headers = Object.assign(
    {},
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    { method, body: JSON.stringify(body) },
    { credentials: "include" }
  );

  return fetch(`${BASE_URL}/${endpoint}`, headers)
    .then(checkStatus)
    .then(parseJSON);
}

export function get(endpoint, params = {}) {
  const headers = Object.assign(
    {},
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    { credentials: "include" }
  );

  const urlParams = new URLSearchParams(Object.entries(params));

  return fetch(`${BASE_URL}/${endpoint}?${urlParams}`, headers)
    .then(checkStatus)
    .then(parseJSON);
}
