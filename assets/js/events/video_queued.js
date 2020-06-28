import tinyTemplate from "../templates/tiny.js";
import Player from "../components/player.js";

const videoQueued = () => {
  window.channelSocket.on("video_queued", (payload) => {
    Player(payload);

    console.log(payload);
    tinyTemplate(payload);
  });
};

export default videoQueued;
