import tinyTemplate from "../templates/tiny.js";

const userLeft = () => {
  window.channelSocket.on("user_left", (payload) => {
    tinyTemplate(payload);
  });
};

export default userLeft;
