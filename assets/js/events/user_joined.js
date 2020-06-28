import imageTemplate from "../templates/image.js";

const userJoined = (channel) => {
  channel.on("user_joined", (payload) => {
    imageTemplate(payload);
  });
};

export default userJoined;
