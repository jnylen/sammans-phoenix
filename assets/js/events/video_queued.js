import tinyTemplate from "../templates/tiny.js";
import Player from "../components/player.js";

const videoQueued = (channel) => {
  channel.on("video_queued", (payload) => {
    Player(payload);

    console.log(payload);
    tinyTemplate(payload);
  });
};

export default videoQueued;
