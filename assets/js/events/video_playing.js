import tinyTemplate from "../templates/tiny.js";

const videoPlaying = () => {
  window.channelSocket.on("video_playing", (payload) => {
    tinyTemplate(payload);
  });
};

export default videoPlaying;
