export const executeFetch = (
  endpoint: string,
  postPayload?: Object
): Promise<Response> => {
  const fetchConfig: any = {
    method: postPayload === undefined ? "get" : "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (postPayload) {
    fetchConfig.body = JSON.stringify(postPayload);
  }
  return fetch(`${window.location.href}api/${endpoint}`, fetchConfig);
};
