import tinyTemplate from "../templates/tiny.js";

const userJoined = (channel) => {
  channel.on("user_joined", (payload) => {
    tinyTemplate(payload);
  });
};

export default userJoined;
