const serverUrl = "http://localhost:3001";
const auth = serverUrl + "/api/auth";
const message = serverUrl + "/api/messages";
const serverApi = {
  register: auth + "/register",
  login: auth + "/login",
  getAllUser: auth + "/users",
  getAllMessage: message + "/getAllMessage",
  sendMessage: message + "/sendMessage",
};

export { serverUrl, serverApi };
