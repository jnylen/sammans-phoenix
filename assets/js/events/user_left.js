import imageTemplate from "../templates/image.js";

const userLeft = (channel) => {
  channel.on("user_left", (payload) => {
    imageTemplate(payload);
  });
};

export default userLeft;
