import tinyTemplate from "../templates/tiny.js";

const videoPaused = () => {
  window.channelSocket.on("video_paused", (payload) => {
    tinyTemplate(payload);
    window.actualPlayer.pause();
  });
};

export default videoPaused;
