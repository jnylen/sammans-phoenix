import tinyTemplate from "../templates/tiny.js";

const userLeft = (channel) => {
  channel.on("user_left", (payload) => {
    tinyTemplate(payload);
  });
};

export default userLeft;
