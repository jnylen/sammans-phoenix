// Handles the events listening for VideoJS based players
import {
  durationTracker,
  endedTracker,
  playTracker,
  pauseTracker,
  canPlayTracker,
  canPlayThroughTracker,
  loadStartTracker,
  seekingTracker,
  seekedTracker,
  stalledTracker,
} from "./base.js";

const videoJS = () => {
  window.actualPlayer.on("timeupdate", durationTracker);

  window.actualPlayer.on("ended", endedTracker);
  window.actualPlayer.on("play", playTracker);
  window.actualPlayer.on("pause", pauseTracker);
  window.actualPlayer.on("canplay", canPlayTracker);
  window.actualPlayer.on("canplaythrough", canPlayThroughTracker);
  window.actualPlayer.on("loadstart", loadStartTracker);
  window.actualPlayer.on("seeking", seekingTracker);
  window.actualPlayer.on("seeked", seekedTracker);
  window.actualPlayer.on("stalled", stalledTracker);
};

export default videoJS;
