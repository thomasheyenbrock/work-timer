import fetch from "isomorphic-unfetch";

const customFetch = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, {
    method: "GET",
    ...init,
    headers: {
      ...((init || {}).headers || {}),
      Accept: "application/json"
    }
  });
  const response = await res.json();
  return response;
};

export default customFetch;
