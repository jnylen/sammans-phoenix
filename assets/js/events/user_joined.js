import tinyTemplate from "../templates/tiny.js";

const userJoined = () => {
  window.channelSocket.on("user_joined", (payload) => {
    tinyTemplate(payload);
  });
};

export default userJoined;
