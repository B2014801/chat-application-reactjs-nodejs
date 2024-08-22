const serverUrl = "http://localhost:3001/api";
const auth = serverUrl + "/auth";
const message = serverUrl + "/messages";
const serverApi = {
  register: auth + "/register",
  getAllUser: auth + "/users",
  getAllMessage: message + "/getAllMessage",
  sendMessage: message + "/sendMessage",
};

export { serverUrl, serverApi };
