import tinyTemplate from "../templates/tiny.js";

const videoPlaying = () => {
  window.channelSocket.on("video_playing", (payload) => {
    tinyTemplate(payload);
    window.actualPlayer.play();
  });
};

export default videoPlaying;
