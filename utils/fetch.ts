import fetch from "isomorphic-unfetch";

const customFetch: typeof fetch = async function(...args) {
  const res = await fetch(args[0], {
    ...args[1],
    headers: {
      ...((args[1] || {}).headers || {}),
      Accept: "application/json"
    }
  });
  const response = await res.json();
  return response;
};

export default customFetch;
